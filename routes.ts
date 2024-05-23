import express from "express";
import { router as utilsRouter } from "./utils/router";
import { router as usersRouter } from "./users/router";

const router = express.Router();

router.use("/api", usersRouter);
router.use("/api", utilsRouter);

export { router };
