import db from "./config";
import { pick } from "../helpers/utils/repositoryUtils";
const todoRef = db.collection("todos");

/**
 * @param {limit, sort}
 * @returns {[{id: string, createdAt: {_seconds: number, _nanoseconds: number}, text: string, isCompleted: boolean}, ...]}
 */
export async function list({ limit = 10, sort = "asc" } = {}) {
  let query = todoRef;
  if (sort) {
    query = query.orderBy("createdAt", sort);
  }
  if (limit) {
    query = query.limit(limit);
  }
  const todoSnapshot = await query.get();

  return todoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * @param {id, fields}
 * @returns {[{id: string, createdAt: {_seconds: number, _nanoseconds: number}, text: string, isCompleted: boolean, updatedAt?: {_seconds: number, _nanoseconds: number}}, ...]}
 */
export async function getOne(id, fields) {
  let query = todoRef.doc(id);
  if (fields) {
    query = query.select(fields);
  }
  const todoSnapshot = await query.get();
  return { id: todoSnapshot.id, ...todoSnapshot.data() };
}

/**
 * @param id
 */
export async function remove(id) {
  return todoRef.doc(id).delete();
}

/**
 * @param ids
 */
export async function bulkRemove(ids = []) {
  const batch = db.batch();
  ids.map((id) => batch.delete(todoRef.doc(id)));
  return batch.commit();
}

/**
 * @param id
 */
export async function update(id, newData) {
  return todoRef.doc(id).update({ ...newData, updatedAt: new Date() });
}

/**
 * @param {ids, newData}
 */
export async function bulkUpdate(ids = [], newData) {
  const batch = db.batch();
  ids.map((id) =>
    batch.update(todoRef.doc(id), { ...newData, updatedAt: new Date() })
  );
  return batch.commit();
}

/**
 * @param data
 * @returns {string}
 */
export async function add(data) {
  const newTodo = await todoRef.add({
    ...data,
    isCompleted: false,
    createdAt: new Date(),
  });
  return newTodo.id;
}
