import Shopify from 'shopify-api-node';
import {add, list, remove} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function syncNotifications({shopifyDomain, shopId, accessToken}) {
  const shopify = new Shopify({
    accessToken: accessToken,
    shopName: shopifyDomain
  });

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
  }
  
  `;
  const data = await shopify.graphql(query);
  return await Promise.all([
    data.orders.edges.map(async order => {
      const data = {
        timestamp: order.node.createdAt,
        firstName: order.node.customer?.firstName || null,
        city: order.node.customer.defaultAddress.city || null,
        country: order.node.customer.defaultAddress.country || null,
        productName: order.node.lineItems?.edges[0]?.node.product.title,
        productId: order.node.lineItems?.edges[0]?.node.product.id,
        productImage: order.node.lineItems.edges[0]?.node.image.url
      };
      return await add({data: data, shopId: shopId, shopifyDomain: shopifyDomain});
    })
  ]);
}

export async function getNotificationItem(shopify, orderData) {
  const order = orderData;
  const productId = order?.line_items[0]?.product_id;
  const detailProduct = await shopify.product.get(productId);
  const productImage = detailProduct.image?.src;
  const data = {
    firstName: order.customer?.first_name || null,
    city: order.customer.default_address?.city || null,
    productName: order.line_items[0]?.name,
    country: order.customer.default_address?.country || null,
    productId: productId,
    timestamp: order?.created_at,
    productImage: productImage
  };

  return data;
}

export async function listNotifications(ctx) {
  const shopID = getCurrentShop(ctx);
  const {limit, sort} = ctx.query;
  const notifications = await list({shopId: shopID, limit: limit, sort: sort});
  ctx.body = {data: notifications, success: true};
}

export async function deleteNotifications(ctx) {
  const ids = ctx.req.body.data;
  await remove(ids);

  return (ctx.body = {
    success: true
  });
}
