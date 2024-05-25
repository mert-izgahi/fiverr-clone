import express from "express";
import { withAuth, forAdmin, withValidate } from "../middlewares";
import { createOrder } from "./controllers";
import { orderValidationSchema } from "./validators";

const router = express.Router();

router.post(
  "/orders",
  withAuth,
  withValidate(orderValidationSchema),
  createOrder
);

export { router };
