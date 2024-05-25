import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import configs from "../configs";
import { sendResponse } from "../helpers";
import { Gig } from "../gigs/model";
import { User } from "../users/model";

cloudinary.config({
  cloud_name: configs.CLOUDINARY_CLOUD_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET,
});

const stripe = require("stripe")(configs.STRIPE_SECRET_KEY);

export const uploadImage = async (req: Request, res: Response) => {
  const file = req.files?.image;

  if (!file) return res.status(400).json({ result: "No file uploaded" });
  // Handle the case where file is an array
  const tempFilePath = Array.isArray(file)
    ? file[0].tempFilePath
    : file.tempFilePath;

  const result = await cloudinary.uploader.upload(tempFilePath as string, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "job-portal",
  });

  res.status(200).json({
    result: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { currentUserId } = res.locals;
  req.body.buyer = currentUserId;
  const currentUser = await User.findById(currentUserId);
  const { gigId } = req.body;

  const gig = await Gig.findById(gigId).populate("seller");

  if (!gig) return sendResponse(res, { result: "gig not found", status: 404 });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: gig.title,
            images: [gig.coverUrl],
          },
          unit_amount: gig.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    ui_mode: "embedded",
    return_url: `${configs.CLIENT_URL}/payment-result?session_id={CHECKOUT_SESSION_ID}&gigId=${gigId}`,
    customer_email: currentUser?.email,

    payment_method_types: ["card"],
    metadata: {
      gigId,
      buyerId: currentUserId,
    },
  });

  const clientSecret = session.client_secret;
  res.status(200).json({ result: { clientSecret }, status: 200 });
};

export const getPaymentIntentStatus = async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  const paymentIntent = await stripe.checkout.sessions.retrieve(
    sessionId as string
  );
  
  

  sendResponse(res, { result: paymentIntent, status: 200 });
};
