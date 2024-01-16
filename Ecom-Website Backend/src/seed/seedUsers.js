import usersData from "./userData.js";

export default async function seedUsers() {
  await Promise.all(usersData.map((item) => Users.create(item)));
}
