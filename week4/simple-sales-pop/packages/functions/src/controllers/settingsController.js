import {getCurrentShop} from '../helpers/auth';
import * as settingsRepo from '../repositories/settingsRepository';

/**
 * Retrieves a setting for a specific shop.
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the setting is retrieved.
 */
export async function getSetting(ctx) {
  const shopID = getCurrentShop(ctx);
  const setting = await settingsRepo.getOne(shopID);
  ctx.body = {data: setting, success: true};
}

/**
 * Updates a setting.
 * @param {Object} ctx - The context object.
 * @returns {Promise<void>} - A promise that resolves when the setting is updated.
 */
export async function updateSetting(ctx) {
  const data = ctx.req.body.data;
  const shopID = getCurrentShop(ctx);
  await settingsRepo.updateOne(shopID, data);
  ctx.body = {data: {}, success: true};
}
