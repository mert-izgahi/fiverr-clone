import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../configs";

export interface IUser extends mongoose.Document {
  _id?: string;
  role: "admin" | "user";
  email: string | undefined;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "candidate", "recruiter"],
      default: "candidate",
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    imageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    bio: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", null],
      default: null,
    },
  },
  { timestamps: true }
);



userSchema.pre("save", async function (next) {
  const hashed = await bcrypt.hash(this.password!, configs.SALT_ROUNDS);
  this.password = hashed;
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    configs.JWT_SECRET as string
  );
};

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export const User = mongoose.model<IUser>("User", userSchema);
