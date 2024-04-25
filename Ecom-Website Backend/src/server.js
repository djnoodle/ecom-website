import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import seedProducts from "./seed/seedProducts.js";
import seedUsers from "./seed/seedUsers.js";
import cors from "cors";
import path, { join } from "path";
import { fileURLToPath } from "url";

import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import multer from "multer";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "assets");

const bucketName = "images";
const upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(cors("*"));

app.use(express.static("assets"));

app.post("/upload", upload.any(), async (req, res) => {
  try {
    const db = await connectDB();
    const bucket = new GridFSBucket(db, { bucketName });
    const products = await db.collection("products").find().toArray();

    for (const product of products) {
      const productId = product.id;
      const imagePath = path.join(assetsPath, `${productId}.jpg`);

      if (fs.existsSync(imagePath)) {
        const fileStream = fs.createReadStream(imagePath);
        const uploadStream = bucket.openUploadStream(productId.toString());

        fileStream.pipe(uploadStream);

        await new Promise((resolve, reject) => {
          uploadStream.on("finish", resolve);
          uploadStream.on("error", reject);
        });
      }
    }

    res.status(200).send("Images mapped to products successfully");
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/products", async (req, res) => {
  const db = await connectDB();
  const products = await db.collection("products").find({}).toArray();

  const bucket = new GridFSBucket(db, { bucketName });

  for (const product of products) {
    const downloadStream = bucket.openDownloadStreamByName(
      product.id.toString(),
    );

    const chunks = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }

    const imageBuffer = Buffer.concat(chunks);
    product.image = imageBuffer.toString("base64");
  }

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

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening on port 8000");
});
