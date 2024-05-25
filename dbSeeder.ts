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

export const categoriesList = [
  { name: "Design", icon: "bi bi-palette" },
  { name: "Web Development", icon: "bi bi-code" },
  { name: "Programming", icon: "bi bi-terminal" },
  { name: "Settings/Configuration", icon: "bi bi-gear" },
  {
    name: "Management/Project Management",
    icon: "bi bi-diagram-3",
  },
  { name: "Translation", icon: "bi bi-translate" },
  { name: "Marketing/Analytics", icon: "bi bi-graph-up" },
  { name: "Team/Collaboration", icon: "bi bi-people" },
  { name: "Global/International", icon: "bi bi-globe" },
  { name: "Education/Reading", icon: "bi bi-book" },
  { name: "Scheduling/Events", icon: "bi bi-calendar" },
  { name: "Business/Work", icon: "bi bi-briefcase" },
  { name: "Communication/Support", icon: "bi bi-chat-dots" },
  { name: "Data/Database", icon: "bi bi-stack" },
  { name: "Finance/Budgeting", icon: "bi bi-wallet" },
  { name: "Statistics/Reports", icon: "bi bi-bar-chart" },
  { name: "Cloud Services", icon: "bi bi-cloud" },
  { name: "Social/Community", icon: "bi bi-emoji-smile" },
  { name: "Music/Audio", icon: "bi bi-music-note" },
  { name: "Photography/Media", icon: "bi bi-camera" },
  { name: "Ecommerce/Retail", icon: "bi bi-shop" },
  { name: "Logistics/Delivery", icon: "bi bi-truck" },
  { name: "Writing/Editing", icon: "bi bi-pencil" },
  { name: "Video/Media Production", icon: "bi bi-film" },
  { name: "Technology/IT", icon: "bi bi-laptop" },
  { name: "Ideas/Innovation", icon: "bi bi-lightbulb" },
  { name: "Security/Protection", icon: "bi bi-shield-lock" },
  { name: "Art/Creative Work", icon: "bi bi-brush" },
  { name: "Notifications/Alerts", icon: "bi bi-bell" },
  {
    name: "Documents/File Management",
    icon: "bi bi-file-earmark",
  },
  { name: "Organization/Storage", icon: "bi bi-folder" },
  { name: "Connections/Networking", icon: "bi bi-link-45deg" },
  { name: "Travel/Location", icon: "bi bi-map" },
  { name: "Shopping/Commerce", icon: "bi bi-cart" },
  { name: "Payment/Transactions", icon: "bi bi-credit-card" },
  { name: "Tools/Repair", icon: "bi bi-wrench" },
  { name: "Favorites/Likes", icon: "bi bi-heart" },
  { name: "Featured/Popular", icon: "bi bi-star" },
  { name: "Achievements/Awards", icon: "bi bi-trophy" },
  { name: "Recognition/Certification", icon: "bi bi-award" },
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
    imageUrl: faker.image.avatar(),
    bio: faker.person.bio(),
    gender: faker.helpers.arrayElement(["male", "female", null]),
  };
};

const randomGig = async () => {
  const categories = await Category.find({});
  const randCat = faker.helpers.arrayElement(categories);
  const users = await User.find({});
  const randUser = faker.helpers.arrayElement(users);
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    images: faker.helpers.arrayElements(gigsImages, 3),
    deliveryDays: faker.number.int({ min: 1, max: 30 }),
    price: faker.number.int({ min: 1, max: 1000 }),
    category: randCat._id,
    tags: faker.helpers.arrayElements(
      categories.map((c) => c.name),
      3
    ),
    features: faker.helpers.arrayElements(featuresList, 3),
    coverUrl: faker.helpers.arrayElement(gigsImages),
    seller: randUser._id,
    faqs: faker.helpers.arrayElements(
      faqList.map((f) => ({ question: f.question, answer: f.answer })),
      faker.number.int({ min: 1, max: 5 })
    ),
  } as IGig;
};

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
    for (let i = 0; i < categoriesList.length; i++) {
      // categories.push(randomCategory());
      randCategories.push({
        name: categoriesList[i].name,
        description: faker.commerce.productDescription(),
        icon: categoriesList[i].icon,
      });
    }

    await Category.insertMany(randCategories);
    console.log("👉 Categories seeded successfully");

    const randGigs = [];

    for (let i = 0; i < 30; i++) {
      const gig = await randomGig();
      randGigs.push(gig);
    }
    const savedGigs = await Gig.insertMany(randGigs);
    console.log(randGigs);
    
    console.log("👉 Gigs seeded successfully");

    console.log("👉 Seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

seed();
