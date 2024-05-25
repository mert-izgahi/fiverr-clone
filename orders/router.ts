import express from "express";
import { withAuth, withValidate } from "../middlewares";
import { createOrder, getSellerOrders, getBuyerOrders } from "./controllers";
import { orderValidationSchema } from "./validators";

const router = express.Router();

router.post(
  "/orders",
  withAuth,
  withValidate(orderValidationSchema),
  createOrder
);

router.get("/seller-orders", withAuth, getSellerOrders);
router.get("/buyer-orders", withAuth, getBuyerOrders);

export { router };
