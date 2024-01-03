import {getCurrentShop} from '../helpers/auth';
import * as settingsRepo from '../repositories/settingsRepository';

export async function getSetting(ctx) {
  const shopID = getCurrentShop(ctx);
  const setting = await settingsRepo.getOne(shopID);
  ctx.body = {data: setting, success: true};
}

export async function updateSetting(ctx) {
  const data = ctx.req.body.data;
  const shopID = getCurrentShop(ctx);
  await settingsRepo.updateOne(shopID, data);
  ctx.body = {data: {}, success: true};
}
