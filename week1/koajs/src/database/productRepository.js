import { writeDatabase, getIndexFromId } from "../utils/repositoryUtils";
const { data: products } = require("./products.json");
const file = "products.json";

export function getAll() {
  return products;
}

export function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

export function remove(id) {
  const index = getIndexFromId(id, products);
  products.splice(index, 1)[0];
  return writeDatabase(products, file);
}

export function update(id, newData) {
  const index = getIndexFromId(id, products);
  products[index] = { ...products[index], ...newData };
  return writeDatabase(products, file);
}

export function add(data) {
  const updatedProducts = [data, ...products];
  return writeDatabase(updatedProducts, file);
}
