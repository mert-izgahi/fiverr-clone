import dotenv from "dotenv";
import path from "path";

const dotenvPath = path.resolve(
  __dirname,
  `./.env.${process.env.NODE_ENV || "local"}`
);

dotenv.config({ path: dotenvPath });

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/job-portal-db",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  LIMIT_PER_PAGE: 10,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
};
