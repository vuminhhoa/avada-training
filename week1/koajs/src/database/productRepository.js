import fs from "fs";
const { data: products } = require("./products.json");

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

export function getOne(id, { fields } = {}) {
  return products.find((product) => product.id === parseInt(id));
}

export function remove(id) {
  const index = products.findIndex((product) => product.id === parseInt(id));
  products.splice(index, 1)[0];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}

export function update(id, newData) {
  const index = products.findIndex((product) => product.id === parseInt(id));
  console.log(index);
  products[index] = { ...products[index], ...newData };
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}

export function add(data) {
  const updatedProducts = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}
