import express from "express";
import { withAuth, forAdmin, withValidate } from "../middlewares";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./controllers";
import { categoryValidationSchema } from "./validators";

const router = express.Router();

router.post(
  "/categories",
  withAuth,
  forAdmin,
  withValidate(categoryValidationSchema),
  createCategory
);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.put(
  "/categories/:id",
  withAuth,
  forAdmin,
  withValidate(categoryValidationSchema),
  updateCategory
);
router.delete("/categories/:id", withAuth, forAdmin, deleteCategory);

export { router };
