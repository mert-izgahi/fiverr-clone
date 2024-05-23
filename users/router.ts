import express from "express";
import { signIn, signUp, signOut, updatePassword, updateAccount, getAccount } from "./controllers";
import { withAuth, withValidate } from "../middlewares";
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

export { router };
