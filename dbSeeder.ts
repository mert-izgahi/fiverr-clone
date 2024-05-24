import { connectDb } from "./helpers";
import { faker } from "@faker-js/faker";

import { Category } from "./categories/model";
import { User } from "./users/model";
const categoryIcons = [
  "bi bi-house",
  "bi bi-book",
  "bi bi-cart",
  "bi bi-chat",
  "bi bi-chat-left",
  "bi bi-chat-left-dots",
  "bi bi-chat-left-text",
  "bi bi-chat-right",
  "bi bi-chat-right-dots",
  "bi bi-chat-right-text",
  "bi bi-chat-square",
  "bi bi-chat-square-dots",
  "bi bi-chat-square-text",
  "bi bi-chat-text",
  "bi bi-chat-text-fill",
  "bi bi-clipboard",
  "bi bi-clipboard2",
  "bi bi-clipboard2-check",
  "bi bi-clipboard2-check-fill",
  "bi bi-clipboard2-data",
  "bi bi-clipboard2-data-fill",
  "bi bi-clipboard2-fill",
  "bi bi-clipboard2-heart",
];

const usesAvatars = [
  "https://source.unsplash.com/random/400x300/?avatar",
  "https://source.unsplash.com/random/400x300/?user",
  "https://source.unsplash.com/random/400x300/?profile",
  "https://source.unsplash.com/random/400x300/?profile-picture",
  "https://source.unsplash.com/random/400x300/?face",
  "https://source.unsplash.com/random/400x300/?human",
  "https://source.unsplash.com/random/400x300/?human-face",
  "https://source.unsplash.com/random/400x300/?human-head",
  "https://source.unsplash.com/random/400x300/?human-face-mask",
  "https://source.unsplash.com/random/400x300/?human-face-mask-1",
];

const randomUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: "Aa123456",
    role: "user",
    imageUrl: faker.image.avatar(),
    bio: faker.person.bio(),
    gender: faker.helpers.arrayElement(["male", "female", null]),
  };
};

const randomCategory = () => {
  return {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    icon: faker.helpers.arrayElement(categoryIcons),
  };
};

const seed = async () => {
  const db = await connectDb();
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    const users = [];
    for (let i = 0; i < 30; i++) {
      users.push(randomUser());
    }
    const categories = [];
    for (let i = 0; i < 50; i++) {
      categories.push(randomCategory());
    }
    await User.insertMany(users);
    await Category.insertMany(categories);
    console.log("👉 Seeded successfully");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};


seed();