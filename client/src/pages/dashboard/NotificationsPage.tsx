import React, { useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import { Button } from "@mantine/core";
import NotificationItem from "../../components/NotificationItem";

function NotificationsPage() {
  const { currentUser } = useAppSelector((store) => store.auth);
  const notifications = useMemo(() => {
    return currentUser.notifications;
  }, [currentUser]);
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <pre>{JSON.stringify(notifications, null, 2)}</pre>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Notifications</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {notifications?.map((notification) => {
                  return (
                    <li key={notification._id} className="list-group-item">
                      <NotificationItem notification={notification}/>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;