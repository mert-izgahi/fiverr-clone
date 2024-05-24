import express from "express";
import { router as utilsRouter } from "./utils/router";
import { router as usersRouter } from "./users/router";
import { router as categoriesRouter } from "./categories/router";

const router = express.Router();

router.use("/api", usersRouter);
router.use("/api", utilsRouter);
router.use("/api", categoriesRouter);

export { router };
