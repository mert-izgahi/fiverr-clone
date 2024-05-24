import express from "express";
import {
  signIn,
  signUp,
  signOut,
  updatePassword,
  updateAccount,
  getAccount,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser
} from "./controllers";
import { forAdmin, withAuth, withValidate } from "../middlewares";
import { signInSchema, signUpSchema, updatePasswordSchema } from "./validators";

const router = express.Router();

router.post("/sign-up", withValidate(signUpSchema), signUp);
router.post("/sign-in", withValidate(signInSchema), signIn);
router.post("/sign-out", signOut);
router.put(
  "/update-password",
  withAuth,
  withValidate(updatePasswordSchema),
  updatePassword
);
router.put("/account", withAuth, updateAccount);
router.get("/account", withAuth, getAccount);

// ADMIN ROUTES
router.get("/users", withAuth, forAdmin, getAllUsers);
router.get("/users/:id", withAuth, forAdmin, getOneUser);
router.put("/users/:id", withAuth, forAdmin, updateUser);
router.delete("/users/:id", withAuth, forAdmin, deleteUser);
export { router };
