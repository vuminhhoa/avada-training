export async function registerScriptTags(shopify) {
  const data = {
    event: 'onload',
    src: 'http://localhost:5000/scripttag/avada-sale-pop.min.js'
  };
  const scriptTags = await shopify.scriptTag.list();
  const scriptTag = scriptTags.filter(item => item.src === data.src);
  if (!scriptTag) {
    return shopify.scriptTag.create(data);
  }
}
