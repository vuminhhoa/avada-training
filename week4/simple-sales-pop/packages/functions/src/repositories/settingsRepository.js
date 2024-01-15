import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

/**
 * Retrieves a single setting document based on the provided shopId.
 * @param {string} shopId - The ID of the shop.
 * @returns {Promise<Object|null>} - A promise that resolves to the setting document object if found, or null if not found.
 */
export async function getOne(shopId) {
  try {
    const setting = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (setting.empty) return null;

    const settingDoc = setting.docs[0];

    return {id: settingDoc.id, ...settingDoc.data()};
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Updates a single setting document in the database.
 *
 * @param {string} shopId - The ID of the shop.
 * @param {Object} data - The updated data for the setting.
 * @returns {Promise<firebase.firestore.WriteResult|null>} A promise that resolves to the result of the update operation, or null if the setting is not found or an error occurs.
 */
export async function updateOne(shopId, data) {
  try {
    const setting = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (setting.empty) return null;

    return collection.doc(data.id).update({...data});
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Adds data to the collection with a timestamp.
 * @param {Object} data - The data to be added.
 * @returns {Promise<firebase.firestore.DocumentReference|null>} - A promise that resolves to the document reference if successful, or null if an error occurs.
 */
export async function add(data) {
  try {
    return collection.add({...data, timestamp: new Date()});
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Adds default settings for a shop.
 *
 * @param {string} shopId - The ID of the shop.
 * @param {object} defaultData - The default settings data.
 * @returns {Promise<object|null>} - A promise that resolves to the added settings object, or null if the settings already exist or an error occurred.
 */
export async function addDefaultSettings(shopId, defaultData) {
  try {
    const settingInDb = await getOne(shopId);
    if (settingInDb) return null;

    return add({
      ...defaultData,
      shopId
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
