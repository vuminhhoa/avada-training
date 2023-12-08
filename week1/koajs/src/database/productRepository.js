import {
  sortByField,
  pick,
  writeDatabase,
  getLimits,
} from "../helpers/utils/repositoryUtils";
const { data: products } = require("./products.json");
const file = "products.json";

export function getAll(limits, sort) {
  let allProducts = products;
  if (sort) {
    allProducts = sortByField(allProducts, "createdAt", sort);
  }
  if (limits) {
    allProducts = getLimits(allProducts, limits);
  }
  return allProducts;
}

export function getOne(id, fields) {
  const product = products.find((product) => product.id === parseInt(id));
  if (fields) {
    product = pick(product, fields);
  }
  return product;
}

export function remove(id) {
  let allProducts = products;
  allProducts = allProducts.filter((item) => item.id.toString() !== id);
  return writeDatabase(allProducts, file);
}

export function update(id, newData) {
  let allProducts = products;

  allProducts = allProducts.map((item) => {
    if (item.id.toString() === id) {
      return { ...item, ...newData };
    }
    return item;
  });
  return writeDatabase(allProducts, file);
}

export function add(data) {
  const currentDate = new Date();
  const newId = Math.max(...products.map((item) => item.id)) + 1;
  const newProduct = { id: newId, ...data, createdAt: currentDate };
  products.push(newProduct);
  return writeDatabase(products, file);
}
