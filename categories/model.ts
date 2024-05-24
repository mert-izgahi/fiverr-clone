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

// categorySchema.virtual("gigsCount", {
//   ref: "Gig",
//   localField: "_id",
//   foreignField: "category",
//   count: true,
//   sort: { gigsCount: -1 },
// })



categorySchema.set("toJSON", {
  virtuals: true,
});

categorySchema.set("toObject", {
  virtuals: true,
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);

