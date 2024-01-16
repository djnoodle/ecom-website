import productsData from "./productsData.js";

export default async function seedProducts() {
  await Promise.all(productsData.map((item) => Products.create(item)));
}

// await Promise.all(usersData.map((item) => Users.create(item)))

// await Products.create({
//   id: '123123123',
//   name: 'test',
//   price: 1234,
//   description: '123124',
//   imageUrl: 'https://google.com',
//   averageRating: '1'
// })
