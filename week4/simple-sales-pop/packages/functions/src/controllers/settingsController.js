import {getOne, updateOne} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '../helpers/auth';
import {add} from '../repositories/settingsRepository';

export async function getSetting(ctx) {
  const shopID = getCurrentShop(ctx);
  const setting = await getOne(shopID);
  ctx.body = {data: setting, success: true};
}

export async function updateSetting(ctx) {
  const data = ctx.req.body.data;
  const shopID = getCurrentShop(ctx);
  await updateOne(shopID, data);
  ctx.body = {data: {}, success: true};
}

export async function addSettings(shopId, data) {
  return await add(shopId, data);
}
