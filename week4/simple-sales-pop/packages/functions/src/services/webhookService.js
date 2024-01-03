export async function registerWebhook(shopify) {
  const data = {
    topic: 'orders/create',
    address: 'https://b60d-171-224-179-158.ngrok-free.app/webhook/order/new',
    format: 'json'
  };
  const webhooks = await shopify.webhook.list();
  const webhook = webhooks.filter(item => item.address === data.address);
  if (!webhook) {
    return shopify.webhook.create(data);
  }
}
