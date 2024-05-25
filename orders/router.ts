import express from "express";
import { withAuth, forAdmin, withValidate } from "../middlewares";
import { createOrder, getOrders } from "./controllers";
import { orderValidationSchema } from "./validators";

const router = express.Router();

router.post(
  "/orders",
  withAuth,
  withValidate(orderValidationSchema),
  createOrder
);

router.get("/orders", withAuth, getOrders);

export { router };
