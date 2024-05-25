import express from "express";
import { withAuth } from "../middlewares";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "./controllers";

const router = express.Router();

router.put("/notifications/:id", withAuth, markAsRead);
router.get("/notifications", withAuth, getNotifications);
router.delete("/notifications/:id", withAuth, deleteNotification);
export { router };
