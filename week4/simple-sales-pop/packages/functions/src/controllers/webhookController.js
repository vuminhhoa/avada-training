import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import * as notificationsRepo from '../repositories/notificationsRepository';
import {syncOrderToNoti} from '../services/shopifyService';

/**
 * Listens for new orders and performs necessary actions.
 *
 * @param {Object} ctx - The context object containing the request and response information.
 * @returns {Promise<Object>} - A promise that resolves to the response object.
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

    const newNotification = await syncOrderToNoti(shopify, newOrder);
    notificationsRepo.add({shopId: shopInfo.id, shopDomain, ...newNotification});

    return (ctx.status = 200);
  } catch (e) {
    console.error(e);
    ctx.body = {success: false};
  }
}
