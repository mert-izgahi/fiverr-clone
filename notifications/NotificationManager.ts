import { Notification } from "./model";

class NotificationManager {
  async createNotification({
    userId,
    message,
    isRead,
    payload,
    type
  }: {
    userId: string;
    message: string;
    isRead: boolean;
    payload: any;
    type: "NEW_ORDER" | "NEW_REVIEW" | "NEW_MESSAGE";
  }) {
    const notification = await Notification.create({
      userId,
      message,
      isRead,
      payload,
      type
    });
    return notification;
  }
}

export const notificationManager = new NotificationManager();
