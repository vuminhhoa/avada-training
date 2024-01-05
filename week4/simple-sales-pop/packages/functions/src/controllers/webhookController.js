import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import * as notificationsRepo from '../repositories/notificationsRepository';
import {syncNewOrderToNoti} from '../services/notificationService';

/**
 * Listens for a new order webhook and performs necessary actions.
 * @param {Object} ctx - The context object containing the request and response information.
 * @returns {Object} - The response object indicating the success or failure of the operation.
 */
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
