import fs from "fs";
const { data: todos } = require("./todos.json");

export function writeDatabase(data) {
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: data })
  );
}

export function getIndexFromId(id, data) {
  const currentItem = data.find((item) => item.id === parseInt(id));
  return data.indexOf(currentItem);
}

export function sortDescByField(data, field) {
  return data.sort((a, b) => b[field] - a[field]);
}

export function sortAscByField(data, field) {
  return data.sort((a, b) => a[field] - b[field]);
}

export function getFields(data, fields) {
  fields = fields.split(",");
  let dataFields = {};
  fields.forEach((field) => {
    dataFields[field] = data[field];
  });
  return dataFields;
}

export function getLimits(data, limits) {
  return data.slice(0, limits);
}

export function getAll() {
  return todos;
}

export function getOne(id) {
  return todos.find((item) => item.id === parseInt(id));
}

export function remove(id) {
  const index = getIndexFromId(id, todos);
  todos.splice(index, 1)[0];
  return writeDatabase(todos);
}

export function update(id, newData) {
  const index = getIndexFromId(id, todos);
  todos[index] = { ...todos[index], ...newData };
  return writeDatabase(todos);
}

export function add(data) {
  const updatedTodos = [data, ...todos];
  return writeDatabase(updatedTodos);
}
