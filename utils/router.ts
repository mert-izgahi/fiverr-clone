import express from "express";
const router = express.Router();

import { withAuth } from "../middlewares";
import { uploadImage,createPaymentIntent,getPaymentIntentStatus } from "./controllers";

router.post("/upload-image", withAuth, uploadImage);
router.post("/create-payment-intent", withAuth, createPaymentIntent);
router.get("/check-payment-intent-status/:sessionId", withAuth, getPaymentIntentStatus);

export { router };
