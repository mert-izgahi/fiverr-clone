import express from "express";
import { router as utilsRouter } from "./utils/router";
import { router as usersRouter } from "./users/router";
import { router as categoriesRouter } from "./categories/router";
import { router as gigsRouter } from "./gigs/router";
import { router as ordersRouter } from "./orders/router";
import { router as notificationsRouter } from "./notifications/router";

const router = express.Router();

router.use("/api", usersRouter);
router.use("/api", utilsRouter);
router.use("/api", categoriesRouter);
router.use("/api", gigsRouter);
router.use("/api", ordersRouter);
router.use("/api", notificationsRouter);

export { router };
