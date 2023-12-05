"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.getAll = getAll;
exports.getOne = getOne;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  data: books
} = require('./books.json');

/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
function getAll() {
  return books;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
function getOne(id) {
  return books.find(book => book.id === parseInt(id));
}

/**
 *
 * @param data
 */
function add(data) {
  const updatedBooks = [data, ...books];
  return _fs.default.writeFileSync('./src/database/books.json', JSON.stringify({
    data: updatedBooks
  }));
}
//# sourceMappingURL=bookRepository.js.map