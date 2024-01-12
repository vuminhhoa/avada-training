import {getShopByShopifyDomain} from '@avada/shopify-auth';
import defaultSettings from '../const/settings/defaultSetting';
import Shopify from 'shopify-api-node';
import {addDefaultSettings} from '../repositories/settingsRepository';
import {syncNotifications, registerWebhook} from '../services/shopifyService';
// import {registerScriptTags} from './scripttagService';

/**
 * Executes after the installation of the app on a Shopify store.
 * @param {Object} ctx - The context object containing information about the installation.
 * @returns {Promise<void>} - A promise that resolves when the installation process is complete.
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
      addDefaultSettings(shop.id, {...defaultSettings, shopifyDomain}),
      syncNotifications({shopify: shopify, shopifyDomain: shopifyDomain, shopId: shop.id}),
      registerWebhook(shopify)
      // registerScriptTags(shopify)
    ]);
  } catch (error) {
    console.error(error);
  }
}
