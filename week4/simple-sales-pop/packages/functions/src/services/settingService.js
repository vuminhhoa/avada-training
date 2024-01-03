import * as settingsRepo from '../repositories/settingsRepository';

export async function addSettings(shopId, defaultData) {
  const settingInDb = await settingsRepo.getOne(shopId);

  if (!settingInDb) {
    settingsRepo.add({
      ...defaultData,
      shopId
    });
  }
}
