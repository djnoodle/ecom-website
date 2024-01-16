import connectDB from "../db.js";
import productsData from "./productsData.js";

export default async function seedProducts() {
  const db = await connectDB();
  const products = await db.collection("products").find({}).toArray();

  const toInsert = productsData.filter(
    (product) => !products.some((prod) => prod.id === product.id),
  );
  if (!toInsert.length) return;

  db.collection("products").insertMany(toInsert);
}
