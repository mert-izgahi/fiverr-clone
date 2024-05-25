import { ActionIcon, Indicator, Menu } from "@mantine/core";
import React, { useMemo } from "react";
import { useAppSelector } from "../redux/store";
import { INotification } from "../types";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery } from "../redux/notifications/api";

function NotificationsMenu() {
  //   const { currentUser } = useAppSelector((state) => state.auth);
  //   const notifications = useMemo(() => {
  //     return currentUser.notifications as INotification[];
  //   }, [currentUser]);

  const {data} = useGetNotificationsQuery();

  const newNotifications = useMemo(() => {
    if (data) {
      return data.filter((notification) => !notification.isRead);
    }
  }, [data]);

  return (
    <Menu
      position="bottom-end"
      withArrow
      classNames={{
        dropdown: "bg-body",
      }}
    >
      <Menu.Target>
        {newNotifications!?.length > 0 ? (
          <Indicator color="red" size={10}>
            <ActionIcon className="btn btn-ghost">
              <i className="bi bi-bell"></i>
            </ActionIcon>
          </Indicator>
        ) : (
          <ActionIcon className="btn btn-ghost">
            <i className="bi bi-bell"></i>
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {newNotifications?.map((notification) => (
          <Menu.Item
            key={notification._id}
            leftSection={
              notification.type === "NEW_ORDER" ? (
                <i className="bi bi-bag"></i>
              ) : notification.type === "NEW_REVIEW" ? (
                <i className="bi bi-star"></i>
              ) : (
                <i className="bi bi-chat"></i>
              )
            }
            component={Link}
            to={`/dashboard/notifications`}
          >
            {notification.message}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default NotificationsMenu;
