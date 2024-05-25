import { sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { Notification } from "./model";

export const markAsRead = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndUpdate(id, {
    isRead: true,
  });
  sendResponse(res, { result: notification, status: 200 });
});

export const getNotifications = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const notifications = await Notification.find({ userId: currentUserId });
    sendResponse(res, { result: notifications, status: 200 });
  }
);

export const deleteNotification = asyncWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    sendResponse(res, { result: notification, status: 200 });
  }
);
