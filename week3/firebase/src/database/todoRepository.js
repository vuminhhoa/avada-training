import db from "./config";
import { pick } from "../helpers/utils/repositoryUtils";
const todoRef = db.collection("todos");

/**
 * @param {limit, sort}
 * @returns {[{id: string, createdAt: {_seconds: number, _nanoseconds: number}, text: string, isCompleted: boolean}, ...]}
 */
export async function list({ limit = 10, sort = "asc" } = {}) {
  const todoSnapshot = await todoRef
    .orderBy("createdAt", sort)
    .limit(limit)
    .get();

  return todoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * @param {id, fields}
 * @returns {[{id: string, createdAt: {_seconds: number, _nanoseconds: number}, text: string, isCompleted: boolean, updatedAt?: {_seconds: number, _nanoseconds: number}}, ...]}
 */
export async function getOne(id, fields) {
  const todo = await todoRef.doc(id).get();
  if (fields) {
    return pick(todo.data(), fields);
  }
  return todo.data();
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
