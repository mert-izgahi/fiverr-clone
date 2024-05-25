import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  _id?: mongoose.Types.ObjectId;
  gig: mongoose.Types.ObjectId;
  gigTitle: string;
  gigCoverUrl: string;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  price: number;
  status: string;
  paymentIntentId: string;
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema(
  {
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
    gigTitle: { type: String, required: true },
    gigCoverUrl: { type: String, required: true },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: Number, required: true },
    paymentIntentId: { type: String, required: true, unique: true },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ gig: 1, paymentIntentId: 1 }, { unique: true });

export const Order = mongoose.model<IOrder>("Order", orderSchema);
