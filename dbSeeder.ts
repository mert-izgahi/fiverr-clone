import { connectDb } from "./helpers";
import { faker } from "@faker-js/faker";

import { Category } from "./categories/model";
import { User } from "./users/model";
export const categoryIcons = [
  { categoryLabel: "Design", categoryIcon: "bi bi-palette" },
  { categoryLabel: "Web Development", categoryIcon: "bi bi-code" },
  { categoryLabel: "Programming", categoryIcon: "bi bi-terminal" },
  { categoryLabel: "Settings/Configuration", categoryIcon: "bi bi-gear" },
  {
    categoryLabel: "Management/Project Management",
    categoryIcon: "bi bi-diagram-3",
  },
  { categoryLabel: "Translation", categoryIcon: "bi bi-translate" },
  { categoryLabel: "Marketing/Analytics", categoryIcon: "bi bi-graph-up" },
  { categoryLabel: "Team/Collaboration", categoryIcon: "bi bi-people" },
  { categoryLabel: "Global/International", categoryIcon: "bi bi-globe" },
  { categoryLabel: "Education/Reading", categoryIcon: "bi bi-book" },
  { categoryLabel: "Scheduling/Events", categoryIcon: "bi bi-calendar" },
  { categoryLabel: "Business/Work", categoryIcon: "bi bi-briefcase" },
  { categoryLabel: "Communication/Support", categoryIcon: "bi bi-chat-dots" },
  { categoryLabel: "Data/Database", categoryIcon: "bi bi-stack" },
  { categoryLabel: "Finance/Budgeting", categoryIcon: "bi bi-wallet" },
  { categoryLabel: "Statistics/Reports", categoryIcon: "bi bi-bar-chart" },
  { categoryLabel: "Cloud Services", categoryIcon: "bi bi-cloud" },
  { categoryLabel: "Social/Community", categoryIcon: "bi bi-emoji-smile" },
  { categoryLabel: "Music/Audio", categoryIcon: "bi bi-music-note" },
  { categoryLabel: "Photography/Media", categoryIcon: "bi bi-camera" },
  { categoryLabel: "Ecommerce/Retail", categoryIcon: "bi bi-shop" },
  { categoryLabel: "Logistics/Delivery", categoryIcon: "bi bi-truck" },
  { categoryLabel: "Writing/Editing", categoryIcon: "bi bi-pencil" },
  { categoryLabel: "Video/Media Production", categoryIcon: "bi bi-film" },
  { categoryLabel: "Technology/IT", categoryIcon: "bi bi-laptop" },
  { categoryLabel: "Ideas/Innovation", categoryIcon: "bi bi-lightbulb" },
  { categoryLabel: "Security/Protection", categoryIcon: "bi bi-shield-lock" },
  { categoryLabel: "Art/Creative Work", categoryIcon: "bi bi-brush" },
  { categoryLabel: "Notifications/Alerts", categoryIcon: "bi bi-bell" },
  {
    categoryLabel: "Documents/File Management",
    categoryIcon: "bi bi-file-earmark",
  },
  { categoryLabel: "Organization/Storage", categoryIcon: "bi bi-folder" },
  { categoryLabel: "Connections/Networking", categoryIcon: "bi bi-link-45deg" },
  { categoryLabel: "Travel/Location", categoryIcon: "bi bi-map" },
  { categoryLabel: "Shopping/Commerce", categoryIcon: "bi bi-cart" },
  { categoryLabel: "Payment/Transactions", categoryIcon: "bi bi-credit-card" },
  { categoryLabel: "Tools/Repair", categoryIcon: "bi bi-wrench" },
  { categoryLabel: "Favorites/Likes", categoryIcon: "bi bi-heart" },
  { categoryLabel: "Featured/Popular", categoryIcon: "bi bi-star" },
  { categoryLabel: "Achievements/Awards", categoryIcon: "bi bi-trophy" },
  { categoryLabel: "Recognition/Certification", categoryIcon: "bi bi-award" },
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

// const randomCategory = () => {

//   return {
//     name: faker.commerce.department(),
//     description: faker.commerce.productDescription(),
//     icon: faker.helpers.arrayElement(categoryIcons),
//   };
// };

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
    for (let i = 0; i < categoryIcons.length; i++) {
      // categories.push(randomCategory());
      categories.push({
        name: categoryIcons[i].categoryLabel,
        description: faker.commerce.productDescription(),
        icon: categoryIcons[i].categoryIcon,
      });
    }
    await User.insertMany(users);
    await Category.insertMany(categories);
    console.log("👉 Seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

seed();