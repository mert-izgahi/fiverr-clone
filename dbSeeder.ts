import { connectDb } from "./helpers";
import { faker } from "@faker-js/faker";
import { Gig } from "./gigs/model";
import { Category } from "./categories/model";
import { User } from "./users/model";
import { IGig } from "./client/src/types";
import { features } from "process";
const faqList = [
  {
    question: "What services do you offer?",
    answer:
      "I offer a range of services including web development, graphic design, content writing, SEO optimization, and more. Please check my gig descriptions for specific details.",
  },
  {
    question: "What information do you need from me to get started?",
    answer:
      "I need detailed information about your project requirements, including any specific guidelines, references, and files that are relevant to the project. This helps ensure I deliver exactly what you need.",
  },
  {
    question: "What is your turnaround time?",
    answer:
      "Turnaround times vary depending on the complexity of the project. Typically, smaller tasks can be completed within 2-3 days, while larger projects may take 1-2 weeks. Please refer to the delivery time mentioned in each gig.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes, I offer revisions to ensure you are satisfied with the final result. The number of free revisions depends on the gig package you choose. Additional revisions can be requested for an extra fee.",
  },
  {
    question: "What if I am not satisfied with the final product?",
    answer:
      "Customer satisfaction is my top priority. If you are not satisfied with the final product, I offer revisions to address your concerns. If the issue cannot be resolved, I offer a money-back guarantee as per the terms of the gig.",
  },
  {
    question: "Can you provide custom services not listed in your gigs?",
    answer:
      "Yes, I can provide custom services tailored to your specific needs. Please contact me with your requirements, and I will create a custom offer for you.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All payments are processed through the freelance platform. They support various payment methods including credit/debit cards and PayPal.",
  },
  {
    question: "How do you ensure the quality of your work?",
    answer:
      "I adhere to industry standards and best practices to ensure the quality of my work. Additionally, I stay updated with the latest trends and technologies in my field to provide top-notch services.",
  },
  {
    question: "Can I contact you for support after the project is completed?",
    answer:
      "Absolutely! I offer post-project support for a limited time to ensure everything is working as expected. For ongoing support, we can discuss a maintenance package.",
  },
  {
    question: "Do you have a portfolio of your previous work?",
    answer:
      "Yes, I have a portfolio showcasing my previous projects. You can view it on my profile page or request a copy if needed.",
  },
  {
    question: "What are your working hours?",
    answer:
      "I am available from Monday to Friday, 9 AM to 6 PM (your timezone). However, I strive to respond to messages as soon as possible, even outside of these hours.",
  },
  {
    question: "How do you handle confidentiality and data security?",
    answer:
      "Confidentiality and data security are very important to me. I use secure systems to handle your data and ensure that all information shared is kept confidential. I can also sign a non-disclosure agreement (NDA) if required.",
  },
  {
    question: "Can you work with specific tools or platforms?",
    answer:
      "Yes, I have experience with various tools and platforms. Please let me know your preferred tools or platforms, and I will let you know if I can work with them.",
  },
  {
    question: "Do you offer discounts for bulk orders?",
    answer:
      "Yes, I offer discounts for bulk orders and long-term projects. Please contact me to discuss your project details, and I can provide a custom quote with a discount.",
  },
  {
    question: "How do you communicate during the project process?",
    answer:
      "I am available to discuss any project-related matters during the project process. You can also contact me through the contact form on my profile page.",
  },
];

export const categories = [
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

const gigsImages = [
  "https://source.unsplash.com/random/400x300/?website",
  "https://source.unsplash.com/random/400x300/?development",
  "https://source.unsplash.com/random/400x300/?graphic",
  "https://source.unsplash.com/random/400x300/?code",
  "https://source.unsplash.com/random/400x300/?camera",
  "https://source.unsplash.com/random/400x300/?movie",
  "https://source.unsplash.com/random/400x300/?music",
  "https://source.unsplash.com/random/400x300/?photography",
  "https://source.unsplash.com/random/400x300/?art",
  "https://source.unsplash.com/random/400x300/?design",
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
const featuresList = [
  "Responsive Design",
  "Custom Backend Development",
  "Frontend Development",
  "CMS Integration",
  "E-commerce Functionality",
  "API Integration",
  "Website Optimization",
  "Security Features",
  "SEO Optimization",
  "Custom Plugin Development",
  "Logo Design",
  "Business Card Design",
  "Social Media Graphics",
  "Flyer/Poster Design",
  "Brochure Design",
  "Branding Packages",
  "Infographic Design",
  "Illustration",
  "Packaging Design",
  "3D Modeling",
  "SEO Services",
  "Social Media Management",
  "Content Creation",
  "Email Marketing",
  "Pay-Per-Click Advertising",
  "Influencer Marketing",
  "Analytics Reporting",
  "Conversion Rate Optimization",
  "Campaign Management",
  "Article Writing",
  "Blog Posts",
  "Copywriting",
  "Proofreading & Editing",
  "Technical Writing",
  "Translation Services",
  "Script Writing",
  "Resume Writing",
  "Ebook Writing",
  "Press Release Writing",
  "Explainer Videos",
  "Promotional Videos",
  "Animation",
  "Video Editing",
  "3D Animation",
  "Whiteboard Animation",
  "Intros & Outros",
  "Visual Effects",
  "Subtitling & Captions",
  "Live Action Explainers",
  "Voice Over",
  "Music Production",
  "Audio Editing",
  "Jingles & Drops",
  "Mixing & Mastering",
  "Podcast Editing",
  "Sound Design",
  "Songwriting",
  "Session Musicians",
  "Audiobook Production",
  "Business Plan Writing",
  "Market Research",
  "Financial Consulting",
  "Business Consulting",
  "Virtual Assistance",
  "Data Entry",
  "Legal Consulting",
  "HR Consulting",
  "Project Management",
  "Customer Service",
  "Fitness Coaching",
  "Life Coaching",
  "Cooking Classes",
  "Astrology & Psychics",
  "Personal Styling",
  "Relationship Advice",
  "Wellness Coaching",
  "Travel Planning",
  "Meditation & Mindfulness",
  "Arts & Crafts Lessons",
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

const randomGig = () => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    images: faker.helpers.arrayElements(gigsImages, 3),
    deliveryDays: faker.number.int({ min: 1, max: 30 }),
    price: faker.number.int({ min: 1, max: 1000 }),
    category: faker.helpers.arrayElement(categories).categoryLabel as string,
    tags: faker.helpers.arrayElements(
      categories.map((c) => c.categoryLabel),
      3
    ),
    features: faker.helpers.arrayElements(featuresList, 3),
    coverUrl: faker.helpers.arrayElement(gigsImages),
    seller: "",
    faqs: faker.helpers.arrayElements(
      faqList.map((f) => ({ question: f.question, answer: f.answer })),
      faker.number.int({ min: 1, max: 5 })
    ),
  } as IGig;
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
    await Gig.deleteMany({});
    const users = [];
    for (let i = 0; i < 30; i++) {
      users.push(randomUser());
    }

    const savedUsers = await User.insertMany(users);
    console.log("👉 Users seeded successfully");
    
    const randCategories = [];
    for (let i = 0; i < categories.length; i++) {
      // categories.push(randomCategory());
      randCategories.push({
        name: categories[i].categoryLabel,
        description: faker.commerce.productDescription(),
        icon: categories[i].categoryIcon,
      });
    }

    const savedCategories = await Category.insertMany(randCategories);
    console.log("👉 Categories seeded successfully");
    
    const randGigs = [];

    for (let i = 0; i < 30; i++) {
      const randUser =
        savedUsers[Math.floor(Math.random() * savedUsers.length)];
      randGigs.push({ ...randomGig(), seller: randUser._id });
    }
    const savedGigs = await Gig.insertMany(randGigs);
    console.log("👉 Gigs seeded successfully");
    
    console.log("👉 Seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

seed();
