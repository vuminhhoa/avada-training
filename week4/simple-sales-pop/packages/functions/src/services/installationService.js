import {getShopByShopifyDomain} from '@avada/shopify-auth';
import defaultSettings from '../const/settings/defaultSetting';
import {addSettings} from '../services/settingService';
import {syncNotifications} from '../services/notificationService';
import {registerWebhook} from './webhookService';
import Shopify from 'shopify-api-node';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      accessToken: shop.accessToken,
      shopName: shopifyDomain
    });
    await Promise.all([
      addSettings(shop.id, {...defaultSettings, shopifyDomain}),
      syncNotifications({shopify: shopify, shopifyDomain: shopifyDomain, shopId: shop.id}),
      registerWebhook(shopify)
      //   registerScriptTags({shopifyDomain, accessToken: shop.accessToken})
    ]);
  } catch (error) {
    console.error(error);
  }
}
