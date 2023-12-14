import {
  sortByField,
  pick,
  writeDatabase,
} from "../helpers/utils/repositoryUtils";
const { data: products } = require("./products.json");
const file = "products.json";

export function list({ limit = 10, sort = "desc" } = {}) {
  let listProducts = [...products];
  if (sort) {
    listProducts = sortByField(listProducts, "createdAt", sort);
  }
  if (limit) {
    listProducts = listProducts.slice(0, parseInt(limit));
  }
  return listProducts;
}

export function getOne(id, fields) {
  const product = products.find((product) => product.id === parseInt(id));
  if (fields) {
    return pick(product, fields);
  }
  return product;
}

export function remove(id) {
  const newProducts = products.filter(
    (product) => product.id.toString() !== id
  );
  return writeDatabase(newProducts, file);
}

export function update(id, newData) {
  const newProducts = products.map((product) => {
    if (product.id.toString() === id) {
      return { ...product, ...newData };
    }
    return product;
  });
  return writeDatabase(newProducts, file);
}

export function add(data) {
  const newProduct = {
    id:
      products.length !== 0
        ? Math.max(...products.map((item) => item.id)) + 1
        : 1,
    ...data,
    createdAt: new Date(),
  };
  const newProducts = [...products, newProduct];
  writeDatabase(newProducts, file);
  return newProduct;
}
