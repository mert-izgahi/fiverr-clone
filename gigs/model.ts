import mongoose from "mongoose";

interface IGig extends mongoose.Document {
  title: string;
  description: string;
  deliveryDays: number;
  price: number;
  category: mongoose.Types.ObjectId;
  tags: string[];
  features: string[];
  images: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  coverUrl: string;
  seller: mongoose.Types.ObjectId;
  views?: number;
  rating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const gigSchema = new mongoose.Schema<IGig>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deliveryDays: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    faqs: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Gig = mongoose.model<IGig>("Gig", gigSchema);


