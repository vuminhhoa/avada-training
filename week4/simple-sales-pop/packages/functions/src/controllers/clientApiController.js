import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {addNotification} from '../repositories/notificationsRepository';
import {getNotificationItem} from './notificationsController';

export async function listNotifications(ctx) {
  console.log('im here ==========================================');
  return (data = {
    test: 'oker'
  });
  //   const {shopifyDomain} = ctx.query;
  //   console.log(shopifyDomain);
  //   const shop = await getShopByShopifyDomain(shopifyDomain);
  //   const notifications = await list({shopId: shop.id});
  //   ctx.body = {data: notifications, success: true};
}
