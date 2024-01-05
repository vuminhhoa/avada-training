import config from '../config/app';
/**
 * Registers script tags for Shopify.
 * @param {Object} shopify - The Shopify object.
 * @returns {Promise} - A promise that resolves with the created script tag.
 */
export async function registerScriptTags(shopify) {
  const URL = 'https://localhost:3000/scripttag/avada-sale-pop.min.js';
  const data = {
    event: 'onload',
    src: URL ? URL : `https://${config.baseUrl}/scripttag/avada-sale-pop.min.js`
  };
  const scriptTags = await shopify.scriptTag.list();
  const scriptTag = scriptTags.filter(item => item.src === data.src);
  if (!scriptTag) {
    return shopify.scriptTag.create(data);
  }
}
