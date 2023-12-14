import {
  sortByField,
  pick,
  writeDatabase,
} from "../helpers/utils/repositoryUtils";
const { data: todos } = require("./todos.json");
const file = "todos.json";

export function list({ limit = 10, sort = "desc" } = {}) {
  let allTodos = [...products];
  if (sort) {
    allTodos = sortByField(allTodos, "createdAt", sort);
  }
  if (limit) {
    allTodos = allTodos.slice(0, parseInt(limit));
  }
  return allTodos;
}

export function getOne(id, fields) {
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (fields) {
    return pick(todo, fields);
  }
  return todo;
}

export function remove(id) {
  const newTodos = todos.filter((todo) => todo.id.toString() !== id);
  return writeDatabase(newTodos, file);
}
export function bulkRemove(ids = []) {
  const newTodos = todos.filter((todo) => !ids.includes(todo.id));
  return writeDatabase(newTodos, file);
}

export function update(id, newData) {
  const newTodos = todos.map((todo) => {
    if (todo.id.toString() === id) {
      return { ...todo, ...newData };
    }
    return todo;
  });
  return writeDatabase(newTodos, file);
}

export function bulkUpdate(ids = [], newData) {
  const newTodos = todos.map((todo) => {
    if (ids.includes(todo.id)) {
      return {
        ...todo,
        isCompleted: newData?.isCompleted,
      };
    }
    return todo;
  });
  return writeDatabase(newTodos, file);
}

export function add(data) {
  const newTodo = {
    id: todos.length !== 0 ? Math.max(...todos.map((item) => item.id)) + 1 : 1,
    ...data,
    isCompleted: false,
    createdAt: new Date(),
  };
  const newTodos = [...todos, newTodo];
  writeDatabase(newTodos, file);
  return newTodo;
}
