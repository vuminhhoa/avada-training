import * as notificationsRepo from '../repositories/notificationsRepository';

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

  return await Promise.all([
    data.orders.edges.map(order => {
      const orderInfo = order.node;
      const firstProductInfo = order.node.lineItems.edges[0]?.node;
      const customerInfo = order.node.customer;

      const data = {
        timestamp: orderInfo.createdAt,
        firstName: customerInfo.firstName || null,
        city: customerInfo.defaultAddress.city || null,
        country: customerInfo.defaultAddress.country || null,
        productName: firstProductInfo.product.title,
        productId: firstProductInfo.product.id,
        productImage: firstProductInfo.image.url,
        shopId: shopId,
        shopifyDomain: shopifyDomain
      };

      return notificationsRepo.add(data);
    })
  ]);
}

export async function syncNewOrderToNoti(shopify, orderData) {
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
