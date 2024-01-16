import connectDB from "../db.js";
import usersData from "./userData.js";

export default async function seedUsers() {
  const db = await connectDB();
  const users = await db.collection("users").find({}).toArray();

  const toInsert = usersData.filter(
    (user) => !users.some((usr) => usr.id === user.id),
  );
  if (!toInsert.length) return;

  db.collection("users").insertMany(toInsert);
}
