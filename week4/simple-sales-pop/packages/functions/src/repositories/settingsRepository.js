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
 * @param {string} id
 * @returns {Object}
 */
export async function getSettingById(shopId) {
  try {
    const setting = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (setting.empty) {
      return null;
    }
    const settingDoc = setting.docs[0];
    return {id: settingDoc.id, ...settingDoc.data()};
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * @param {id: string, data: Object}
 */
export async function updateSettingById(shopId, data) {
  try {
    const setting = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (setting.empty) {
      return null;
    }
    return collection.doc(data.id).update({...data});
  } catch (e) {
    console.error(e);
    return null;
  }
}
