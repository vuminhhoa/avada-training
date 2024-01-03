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
 * @param {shopId: string, data: object}
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
 * @param {limit, sort}
 * @returns {Promise<[{id: string, timestamp: string, shopId: string, city: string, productId: number, productImage:string, country: string, firstName: string}, ...]>}
 */
export async function list({shopId, limit = 10, order = 'timestamp:desc'} = {}) {
  try {
    const orderSplit = order.split(':');
    const field = orderSplit[0];
    const sort = orderSplit[1];
    const query = collection
      .where('shopId', '==', shopId)
      .orderBy(field, sort)
      .limit(limit);

    const notiSnapshot = await query.get();
    return notiSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * @param ids
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
