import db from "./config";
import { pick } from "../helpers/utils/repositoryUtils";
const todoRef = db.collection("todos");

export async function list({ limit = 10, sort = "asc" } = {}) {
  const todoSnapshot = await todoRef
    .orderBy("createdAt", sort)
    .limit(limit)
    .get();

  return todoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getOne(id, fields) {
  const todo = await todoRef.doc(id).get();
  if (fields) {
    return pick(todo.data(), fields);
  }
  return todo.data();
}

export async function remove(id) {
  return todoRef.doc(id).delete();
}

export async function bulkRemove(ids = []) {
  const batch = db.batch();
  ids.map((id) => batch.delete(todoRef.doc(id)));
  return batch.commit();
}

export async function update(id, newData) {
  return todoRef.doc(id).update({ ...newData, updatedAt: new Date() });
}

export async function bulkUpdate(ids = [], newData) {
  const batch = db.batch();
  ids.map((id) =>
    batch.update(todoRef.doc(id), { ...newData, updatedAt: new Date() })
  );
  return batch.commit();
}

export async function add(data) {
  const newTodo = await todoRef.add({
    ...data,
    isCompleted: false,
    createdAt: new Date(),
  });
  return newTodo.id;
}
