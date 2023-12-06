import fs from "fs";
const { data: products } = require("./products.json");

export function writeDatabase(data) {
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: data })
  );
}

export function getIndexFromId(id, data) {
  const currentItem = data.find((item) => item.id === parseInt(id));
  return data.indexOf(currentItem);
}

export function sortDesc(data) {
  return data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function sortAsc(data) {
  return data.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
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
  return products;
}

export function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

export function remove(id) {
  const index = getIndexFromId(id, products);
  products.splice(index, 1)[0];
  return writeDatabase(products);
}

export function update(id, newData) {
  const index = getIndexFromId(id, products);
  products[index] = { ...products[index], ...newData };
  return writeDatabase(products);
}

export function add(data) {
  const updatedProducts = [data, ...products];
  return writeDatabase(updatedProducts);
}
