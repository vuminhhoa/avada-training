import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import * as notificationsRepo from '../repositories/notificationsRepository';
import {syncNewOrderToNoti} from '../services/notificationService';

export async function listenNewOrder(ctx) {
  try {
    const newOrder = ctx.req.body;
    const shopDomain = ctx.get('X-Shopify-Shop-Domain');
    const shopInfo = await getShopByShopifyDomain(shopDomain);
    const shopify = new Shopify({
      shopName: shopDomain,
      accessToken: shopInfo.accessToken
    });

    const newNotification = await syncNewOrderToNoti(shopify, newOrder);
    await notificationsRepo.add({shopId: shopInfo.id, shopDomain, ...newNotification});

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
