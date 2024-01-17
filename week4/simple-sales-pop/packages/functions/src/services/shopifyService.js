require('dotenv').config({path: '../../.env'});
import * as notificationsRepo from '../repositories/notificationsRepository';

/**
 * Synchronizes notifications from Shopify and adds them to the notifications repository.
 * @param {Object} options - The options for syncing notifications.
 * @param {Object} options.shopify - The Shopify instance.
 * @param {string} options.shopId - The ID of the shop.
 * @param {string} options.shopifyDomain - The domain of the Shopify store.
 * @returns {Promise<Array>} - A promise that resolves to an array of added notifications.
 */
export async function syncNotifications({shopify, shopId, shopifyDomain}) {
  const query = `{
      orders(first: 30) {
        edges {
          node {
            id
            name
            customer {
              firstName
              defaultAddress {
                city
                country
              }
            }
            createdAt
            lineItems(first: 1) {
              edges {
                node {
                  id
                  image {
                    url
                  }
                  product {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const data = await shopify.graphql(query);
  const orders = data.orders.edges;

  return await Promise.all([
    orders.forEach(order => {
      const orderInfo = order.node;
      const firstProduct = order.node.lineItems.edges[0].node;
      const customer = order.node.customer;

      const orderData = {
        firstName: customer?.firstName || null,
        city: customer?.defaultAddress?.city || null,
        country: customer?.defaultAddress?.country || null,
        productName: firstProduct.product.title,
        productId: firstProduct.product.id,
        productImage: firstProduct.image.url,
        timestamp: orderInfo.createdAt,
        shopId: shopId,
        shopifyDomain: shopifyDomain
      };

      return notificationsRepo.add(orderData);
    })
  ]);
}

/**
 * Syncs a order to the notification service.
 *
 * @param {Object} shopify - The Shopify API object.
 * @param {Object} order - The order data object.
 * @returns {Promise<Object>} - The data object containing the synced order information.
 */
export async function syncOrderToNoti(shopify, order) {
  const customer = order.customer;
  const firstProduct = order.line_items[0];

  const queryfirstProductImage = `
    {
      product(id: "gid://shopify/Product/${firstProduct.product_id}") {
          images(first: 1) {
              edges {
                  node {
                      src
                  }
              }
          }
      }
  }`;
  const dataQuery = await shopify.graphql(queryfirstProductImage);
  const firstProductImage = dataQuery.product.images.edges[0].node;

  const notification = {
    firstName: customer?.first_name || null,
    city: customer?.default_address?.city || null,
    country: customer?.default_address?.country || null,
    productName: firstProduct.name,
    productId: firstProduct.product_id,
    productImage: firstProductImage.src,
    timestamp: order.created_at
  };

  return notification;
}

/**
 * Registers script tags for Shopify.
 * @param {Object} shopify - The Shopify object.
 * @returns {Promise} - A promise that resolves with the created script tag.
 */
export async function registerScriptTags(shopify) {
  const data = {
    event: 'onload',
    src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  };
  const scriptTags = await shopify.scriptTag.list();
  const scriptTag = scriptTags.filter(item => item.src === data.src);
  if (!scriptTag) {
    return shopify.scriptTag.create(data);
  }
}

/**
 * Registers a webhook with Shopify.
 * @param {Object} shopify - The Shopify instance.
 * @returns {Promise<Object>} - A promise that resolves to the created webhook object.
 */
export async function registerWebhook(shopify) {
  const data = {
    topic: 'orders/create',
    address: `https://${process.env.BASE_URL}/webhook/order/new`,
    format: 'json'
  };

  return shopify.webhook.create(data);
}
