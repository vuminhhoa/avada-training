import db from "./config";
import { pick } from "../helpers/utils/repositoryUtils";
const todoRef = db.collection("todos");

export async function list({ limit = 10, sort = "asc" } = {}) {
  const todoSnapshot = await todoRef
    .orderBy("createdAt", sort)
    .limit(limit)
    .get();

  return todoSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export async function getOne(id, fields) {
  const todo = await todoRef.doc(id).get();
  if (fields) {
    return pick(todo.data(), fields);
  }
  return todo.data();
}

export async function remove(id) {
  return await todoRef.doc(id).delete();
}

export async function bulkRemove(ids = []) {
  return await ids.split(",").map(async (id) => await todoRef.doc(id).delete());
}

export async function update(id, newData) {
  return await todoRef.doc(id).update({ ...newData });
}

export async function bulkUpdate(ids = [], newData) {
  return ids.map(async (id) => await todoRef.doc(id).update({ ...newData }));
}

export async function add(data) {
  return await todoRef.add({
    ...data,
    isCompleted: false,
    createdAt: new Date(),
  });
}
