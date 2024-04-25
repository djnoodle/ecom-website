import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

let db;

var options = {
  server: {
    socketOptions: {
      socketTimeoutMS: SOCKET_TIME_OUT_MS,
      connectTimeoutMS: CONNECTION_TIMEOUT_MS,
    },
  },
};

const connectDB = async () => {
  if (db) return db;
  const client = await MongoClient.connect(process.env.DB_URL, options);
  db = client.db("test");
  return db;
};

export default connectDB;
