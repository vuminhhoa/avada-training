import * as notificationsRepo from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

/**
 * Retrieves a list of notifications for a specific shop.
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the list of notifications is retrieved.
 */
export async function listNotifications(ctx) {
  const shopID = getCurrentShop(ctx);
  const {limit, order} = ctx.query;
  const notifications = await notificationsRepo.list({
    shopId: shopID,
    limit: limit,
    order: order
  });
  ctx.body = {data: notifications, success: true};
}

/**
 * Deletes notifications based on the provided IDs.
 * @param {Object} ctx - The context object.
 * @returns {Promise<void>} - A promise that resolves when the notifications are deleted.
 */
export async function deleteNotifications(ctx) {
  const ids = ctx.req.body.data;
  await notificationsRepo.remove(ids);
  ctx.body = {success: true};
}
