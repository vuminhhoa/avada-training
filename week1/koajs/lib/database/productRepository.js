"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.getAll = getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.update = update;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  data: products
} = require("./products.json");

/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
function getAll() {
  return products;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
function getOne(id) {
  return products.find(product => product.id === parseInt(id));
}

/**
 *
 * @param data
 */

function remove(id) {
  const index = products.findIndex(product => product.id === parseInt(id));
  products.splice(index, 1)[0];
  return _fs.default.writeFileSync("./src/database/products.json", JSON.stringify({
    data: products
  }));
}
function update(id, newData) {
  const productIndex = products.findIndex(product => product.id === parseInt(id));
  products[productIndex] = {
    ...products[productIndex],
    ...newData
  };
  return _fs.default.writeFileSync("./products.json", JSON.stringify({
    data: products
  }));
}
function add(data) {
  const updatedProducts = [data, ...products];
  return _fs.default.writeFileSync("./src/database/products.json", JSON.stringify({
    data: updatedProducts
  }));
}
//# sourceMappingURL=productRepository.js.map