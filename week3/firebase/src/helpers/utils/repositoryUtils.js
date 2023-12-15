import fs from "fs";

export function writeDatabase(data, file) {
  return fs.writeFileSync(
    `./src/database/${file}`,
    JSON.stringify({ data: data }, null, 2)
  );
}

export function sortByField(data, field, type) {
  if (type === "desc") {
    return data.sort((a, b) => {
      if (!isNaN(Date.parse(b[field])) && !isNaN(Date.parse(a[field]))) {
        return Date.parse(b[field]) - Date.parse(a[field]);
      }
      return b[field] - a[field];
    });
  } else if (type === "asc") {
    return data.sort((a, b) => {
      if (!isNaN(Date.parse(a[field])) && !isNaN(Date.parse(b[field]))) {
        return Date.parse(a[field]) - Date.parse(b[field]);
      }
      return a[field] - b[field];
    });
  }
  return data;
}

export function pick(data, fields) {
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
