const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    accessToken: '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',
    shopName: 'hoavm.myshopify.com'
  });

  const data = {
    event: 'onload',
    src: 'http://localhost:5000/scripttag/avada-sale-pop.min.js'
  };
  const scriptTags = await shopify.scriptTag.list();
  console.log('start sct ===== ' + scriptTags);
  const scriptTag = scriptTags.filter(item => item.src === data.src);
  if (!scriptTag) {
    await shopify.scriptTag.create(data);
    const newST = await shopify.scriptTag.list();
    console.log('end sct ===== ' + newST);
  }
  const newST = await shopify.scriptTag.list();
  console.log('end sct ===== ' + newST);
  //   const scriptTagss = await shopify.scriptTag.list();
  //   console.log(scriptTagss);
})();
