import fs from "fs";

export function writeDatabase(data, file) {
  console.log(file);
  return fs.writeFileSync(
    `./src/database/${file}`,
    JSON.stringify({ data: data })
  );
}

export function getIndexFromId(id, data) {
  const currentItem = data.find((item) => item.id === parseInt(id));
  return data.indexOf(currentItem);
}

export function sortDescByField(data, field) {
  return data.sort((a, b) => b[field] - a[field]);
}

export function sortAscByField(data, field) {
  return data.sort((a, b) => a[field] - b[field]);
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
