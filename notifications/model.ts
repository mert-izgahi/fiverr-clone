import mongoose from "mongoose";

export interface INotification extends mongoose.Document {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  message: string;
  isRead: boolean;
  payload: any;
  type: "NEW_ORDER" | "NEW_REVIEW" | "NEW_MESSAGE";
  createdAt?: Date;
  updatedAt?: Date;
}

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, required: true },
    payload: { type: Object, required: true },
  },
  { timestamps: true }
);

notificationSchema.set("toJSON", {
  virtuals: true,
});

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
