import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

let db;
const connectDB = async () => {
  if (db) return db;
  const client = await MongoClient.connect(`${DB_URL}`);
  db = client.db("test");
  return db;
};

export default connectDB;
