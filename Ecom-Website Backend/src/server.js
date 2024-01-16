import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import seedProducts from "./seed/seedProducts.js";
import seedUsers from "./seed/seedUsers.js";

const app = express();
app.use(bodyParser.json());

app.get("/api/products", async (req, res) => {
  const db = await connectDB();
  const products = await db.collection("products").find({}).toArray();

  res.status(200).json(products);
});

app.get("/api/users/:userId/cart", async (req, res) => {
  const db = await connectDB();
  const user = await db.collection("users").findOne({ id: userId });
  if (!user) return res.status(404).json("Could not find user!");
  const products = await db.collection("products").find({}).toArray();
  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map((id) =>
    products.find((product) => product.id === id),
  );

  res.status(200).json(cartItems);
});

app.get("/api/products/:productId", async (req, res) => {
  const db = await connectDB();
  const { productId } = req.params;
  const product = await db.collection("products").findOne({ id: productId });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json("Could not find the product!");
  }
});

app.post("/api/users/:userId/cart", async (req, res) => {
  const db = await connectDB();
  const { userId } = req.params;
  const { productId } = req.body;
  await db.collection("users").updateOne(
    { id: userId },
    {
      $addToSet: { cartItems: productId },
    },
  );
  const user = await db.collection("users").findOne({ id: userId });
  const products = await db.collection("products").find({}).toArray();
  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map((id) =>
    products.find((product) => product.id === id),
  );

  res.status(200).json(cartItems);
});

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  const db = await connectDB();
  const { productId, userId } = req.params;

  await db.collection("users").updateOne(
    { id: userId },
    {
      $pull: { cartItems: productId },
    },
  );

  const user = await db.collection("users").findOne({ id: userId });
  const products = await db.collection("products").find({}).toArray();

  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map((id) =>
    products.find((product) => product.id === id),
  );

  res.status(200).json(cartItems);
});

//Populate database duplicate check
seedProducts();
seedUsers();

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
