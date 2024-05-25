import { useMemo } from "react";
import { useUpdateNotificationStateMutation } from "../redux/notifications/api";
import { INotification } from "../types";
import { Button } from "@mantine/core";

function NotificationItem({ notification }: { notification: INotification }) {
  const [updateNotificationState, { isLoading, error }] =
    useUpdateNotificationStateMutation();

  const isRead = useMemo(() => {
    return notification.isRead;
  }, [notification]);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <p className="mb-0">
        {notification.message} - {isRead ? "Read" : "Unread"}{" "}
      </p>
      {!isRead ? (
        <Button
          type="button"
          disabled={isLoading}
          loading={isLoading}
          onClick={() =>
            updateNotificationState({ _id: notification._id as string })
          }
        >
          Mark as Read
        </Button>
      ) : (
        <p className="text-success mb-0">Read</p>
      )}
    </div>
  );
}

export default NotificationItem;
