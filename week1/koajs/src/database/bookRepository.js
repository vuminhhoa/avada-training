import fs from 'fs';
const {data: books} = require('./books.json');


/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
export function getAll() {
  return books
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
export function getOne(id) {
  return books.find(book => book.id === parseInt(id));
}

/**
 *
 * @param data
 */
export function add(data) {
  const updatedBooks = [data, ...books];
  return fs.writeFileSync('./src/database/books.json', JSON.stringify({
    data: updatedBooks
  }));
}

