import {getSettingById, updateSettingById} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function get(ctx) {
  const shopID = getCurrentShop(ctx);
  const setting = await getSettingById(shopID);
  ctx.body = {data: setting, success: true};
}

export async function update(ctx) {
  const data = ctx.req.body.data;
  const shopID = getCurrentShop(ctx);
  await updateSettingById(shopID, data);
  ctx.body = {data: {}, success: true};
}
