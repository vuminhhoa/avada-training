import {getShopByShopifyDomain} from '@avada/shopify-auth';
import * as settingsRepo from '../repositories/settingsRepository';
import * as notificationsRepo from '../repositories/notificationsRepository';
import moment from 'moment';

/**
 * Retrieves a list of notifications for a specific Shopify domain.
 * @param {Object} ctx - The Koa context object.
 * @param {string} ctx.query.shopifyDomain - The Shopify domain to retrieve notifications for.
 * @returns {Promise<void>} - A promise that resolves when the list of notifications is retrieved.
 */
export async function listNotifications(ctx) {
  const {shopifyDomain} = ctx.query;
  const shop = await getShopByShopifyDomain(shopifyDomain);
  const [settings, notifications] = await Promise.all([
    settingsRepo.getOne(shop.id),
    notificationsRepo.list({shopId: shop.id, limit: 80})
  ]);

  const notiTimeAgoMap = notifications.map(notification => ({
    ...notification,
    timestamp: moment(
      new Date(
        notification.timestamp._seconds * 1000 + notification.timestamp._nanoseconds / 1000000
      )
    ).fromNow()
  }));

  ctx.body = {
    data: {
      settings: settings,
      notifications: notiTimeAgoMap
    }
  };
}
