import fs from "fs";
const { data: products } = require("./products.json");

/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
export function getAll() {
  return products;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
export function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

/**
 *
 * @param data
 */

export function remove(id) {
  const index = products.findIndex((product) => product.id === parseInt(id));
  products.splice(index, 1)[0];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}

export function update(id, newData) {
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  products[productIndex] = { ...products[productIndex], ...newData };
  return fs.writeFileSync(
    "./products.json",
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
