import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getOne} from '@functions/repositories/settingsRepository';
import {list} from '../repositories/notificationsRepository';

export async function listNotifications(ctx) {
  const {shopifyDomain} = ctx.query;
  const shop = await getShopByShopifyDomain(shopifyDomain);

  const setting = await getOne(shop.id);
  const notifications = await list({shopId: shop.id, limit: 30});
  ctx.body = {
    data: {
      setting: setting,
      notifications: notifications
    }
  };
}
