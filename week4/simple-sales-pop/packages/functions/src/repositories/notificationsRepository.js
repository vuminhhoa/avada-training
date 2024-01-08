import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

/**
 * Adds a new notification to the collection.
 *
 * @param {Object} data - The data of the notification.
 * @returns {Promise<DocumentReference|null>} A promise that resolves with the reference to the added document, or null if an error occurs.
 */
export async function add(data) {
  try {
    return collection.add({
      ...data,
      timestamp: new Date(data.timestamp)
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Retrieves a list of notifications based on the provided parameters.
 * @param {Object} options - The options for retrieving the notifications.
 * @param {string} options.shopId - The ID of the shop.
 * @param {number} [options.limit=10] - The maximum number of notifications to retrieve.
 * @param {string} [options.order='timestamp:desc'] - The order in which the notifications should be sorted.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of notification objects.
 * @throws {Error} - If an error occurs while retrieving the notifications.
 */
export async function list({shopId, limit = 10, order = 'timestamp:desc'} = {}) {
  try {
    const orderSplit = order.split(':');
    const field = orderSplit[0];
    const sort = orderSplit[1];
    const query = collection
      .where('shopId', '==', shopId)
      .orderBy(field, sort)
      .limit(Number(limit));

    const notiSnapshot = await query.get();
    return notiSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Removes notifications from the Firestore database.
 * @param {string[]} ids - An array of notification IDs to be removed.
 * @returns {Promise} - A promise that resolves when the batch deletion is completed, or null if an error occurs.
 */
export async function remove(ids = []) {
  try {
    const batch = firestore.batch();
    ids.map(id => batch.delete(collection.doc(id)));
    return batch.commit();
  } catch (e) {
    console.error(e);
    return null;
  }
}
