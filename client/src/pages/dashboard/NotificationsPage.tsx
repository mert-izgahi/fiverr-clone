import NotificationItem from "../../components/NotificationItem";
import { useGetNotificationsQuery } from "../../redux/notifications/api";

function NotificationsPage() {
  const { data: notifications, isLoading, error } = useGetNotificationsQuery();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Notifications</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {notifications?.map((notification) => {
                  return (
                    <li key={notification._id} className="list-group-item">
                      <NotificationItem notification={notification} />
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
