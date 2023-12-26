import Shopify from 'shopify-api-node';
import {add, list, remove} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function syncNotifications({shopifyDomain, shopId, accessToken}) {
  const shopify = new Shopify({
    accessToken: accessToken,
    shopName: shopifyDomain
  });

  const orders = await shopify.order.list({
    status: 'any',
    limit: '30',
    fields: 'line_items,billing_address,created_at,customer'
  });

  return await Promise.all([
    orders.map(async order => {
      const productId = order?.line_items[0]?.product_id;
      const detailProduct = await shopify.product.get(productId);
      const productImage = detailProduct.image?.src;
      const data = {
        firstName: order.customer?.first_name || null,
        city: order.billing_address?.city || null,
        productName: order.line_items[0]?.name,
        country: order.billing_address?.country || null,
        productId: productId,
        timestamp: order?.created_at,
        productImage: productImage
      };

      return await add(data, shopId);
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
    city: order.billing_address?.city || null,
    productName: order.line_items[0]?.name,
    country: order.billing_address?.country || null,
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

export async function removeNotifications(ctx) {
  const ids = ctx.req.body.data;
  console.log(ids);
  await remove(ids);

  return (ctx.body = {
    success: true
  });
}
