import fs from "fs";
const { data: products } = require("./products.json");

export function getAll({ limits, sort } = {}) {
  let result = [...products];

  if (sort) {
    if (sort === "asc") {
      result.sort((a, b) => a.id - b.id);
    } else if (sort === "desc") {
      result.sort((a, b) => b.id - a.id);
    }
  }

  if (limits) {
    result = result.slice(0, limits);
  }
  return result;
}

export function getOne(id, { fields } = {}) {
  const product = products.find((product) => product.id === parseInt(id));
  if (fields) {
    return product[fields];
  }
  return product;
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
