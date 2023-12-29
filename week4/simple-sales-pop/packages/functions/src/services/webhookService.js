import Shopify from 'shopify-api-node';

export async function registerWebhook({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    accessToken: accessToken,
    shopName: shopifyDomain
  });
  return shopify.webhook.create({
    topic: 'orders/create',
    address: 'https://e8e1-171-224-177-204.ngrok-free.app/webhook/order/new',
    format: 'json'
  });
}
