import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import seedProducts from "./seed/seedProducts.js";
import seedUsers from "./seed/seedUsers.js";

const app = express();
app.use(bodyParser.json());

app.get("/api/products", async (req, res) => {
  connectDB();
  res.status(200).json(products);
});

app.get("/api/users/:userId/cart", async (req, res) => {
  connectDB();
  res.status(200).json(cartItems);
});

app.get("/api/products/:productId", async (req, res) => {
  connectDB();
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json("Could not find the product!");
  }
});

app.post("/api/users/:userId/cart", async (req, res) => {
  connectDB();
  const { productId } = req.body;
  const product = products.find((product) => product.id === productId);
  if (product) {
    cartItems.push(product);
    res.status(200).json(cartItems);
  } else {
    res.status(404).json("Could not find product!");
  }
});

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  connectDB();
  const { productId } = req.params;
  cartItems = cartItems.filter((product) => product.id !== productId);
  res.status(200).json(cartItems);
});

//Populate databasee
// seedProducts()
// seedUsers()

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

