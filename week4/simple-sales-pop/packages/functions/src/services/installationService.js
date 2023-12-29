import {getShopByShopifyDomain} from '@avada/shopify-auth';
import defaultSettings from '../const/settings/defaultSetting';
import {addSettings} from '../controllers/settingsController';
import {syncNotifications} from '../controllers/notificationsController';
import {registerWebhook} from './webhookService';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    await Promise.all([
      addSettings(shop.id, {...defaultSettings, shopifyDomain}),
      syncNotifications({shopifyDomain, shopId: shop.id, accessToken: shop.accessToken}),
      registerWebhook({shopifyDomain, accessToken: shop.accessToken})
      //   registerScriptTags({shopifyDomain, accessToken: shop.accessToken})
    ]);
  } catch (error) {
    console.error(error);
  }
}
