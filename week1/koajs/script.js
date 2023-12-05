const faker = require("faker");
const fs = require("fs");

let currentId = 1;

const generateRandomProduct = () => {
  return {
    id: currentId++,
    name: faker.commerce.productName(),
    price: faker.datatype.number({ min: 1, max: 100 }),
    description: faker.lorem.sentence(),
    product: faker.commerce.product(),
    color: faker.commerce.color(),
    createdAt: faker.date.past().toISOString(),
    image: faker.image.imageUrl(),
  };
};

const generateProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateRandomProduct());
  }
  return products;
};

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
};

const numberOfProducts = 1000;
const products = generateProducts(numberOfProducts);

writeToFile("products.json", products);

console.log(
  `Generated ${numberOfProducts} products and saved to products.json`
);
