import * as notificationsRepo from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function listNotifications(ctx) {
  const shopID = getCurrentShop(ctx);
  const {limit, order} = ctx.query;
  const notifications = await notificationsRepo.list({shopId: shopID, limit: limit, order: order});
  ctx.body = {data: notifications, success: true};
}

export async function deleteNotifications(ctx) {
  const ids = ctx.req.body.data;
  await notificationsRepo.remove(ids);

  return (ctx.body = {
    success: true
  });
}
