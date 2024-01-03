import {getShopByShopifyDomain} from '@avada/shopify-auth';
import * as settingsRepo from '@functions/repositories/settingsRepository';
import * as notificationsRepo from '../repositories/notificationsRepository';

export async function listNotifications(ctx) {
  const {shopifyDomain} = ctx.query;
  const shop = await getShopByShopifyDomain(shopifyDomain);

  const {setting, notifications} = await Promise.all([
    settingsRepo.getOne(shop.id),
    notificationsRepo.list({shopId: shop.id, limit: 30})
  ]);

  ctx.body = {
    data: {
      setting: setting,
      notifications: notifications
    }
  };
}
