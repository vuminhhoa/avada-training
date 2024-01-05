import * as settingsRepo from '../repositories/settingsRepository';

/**
 * Adds settings for a specific shop.
 * @param {string} shopId - The ID of the shop.
 * @param {object} defaultData - The default settings data.
 * @returns {Promise<void>} - A promise that resolves when the settings are added.
 */
export async function addSettings(shopId, defaultData) {
  const settingInDb = await settingsRepo.getOne(shopId);

  if (!settingInDb) {
    settingsRepo.add({
      ...defaultData,
      shopId
    });
  }
}
