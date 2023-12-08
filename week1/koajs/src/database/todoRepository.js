import {
  writeDatabase,
  getIndexFromId,
} from "../helpers/utils/repositoryUtils";
const { data: todos } = require("./todos.json");
const file = "todos.json";

export function getAll() {
  return todos;
}

export function getOne(id) {
  return todos.find((item) => item.id === parseInt(id));
}

export function remove(id) {
  const index = getIndexFromId(id, todos);
  todos.splice(index, 1)[0];
  return writeDatabase(todos, file);
}

export function update(id, newData) {
  const index = getIndexFromId(id, todos);
  todos[index] = { ...todos[index], ...newData };
  return writeDatabase(todos, file);
}

export function add(data) {
  const updatedTodos = [data, ...todos];
  return writeDatabase(updatedTodos, file);
}
