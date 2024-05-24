import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
  description: string;
  icon: string;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);

