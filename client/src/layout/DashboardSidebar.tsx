import { NavLink, Stack } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  const userLinks = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: <i className="bi bi-house me-2"></i>,
    },
    {
      title: "Account",
      path: "/dashboard/account",
      icon: <i className="bi bi-person me-2"></i>,
    },
    {
      title: "Gigs",
      path: "/dashboard/gigs",
      icon: <i className="bi bi-book me-2"></i>,
    },
    {
      title: "Orders",
      path: "/dashboard/orders",
      icon: <i className="bi bi-cart me-2"></i>,
    },
    {
      title: "Conversations",
      path: "/dashboard/conversations",
      icon: <i className="bi bi-chat me-2"></i>,
    },
    {
      title: "Notifications",
      path: "/dashboard/notifications",
      icon: <i className="bi bi-bell me-2"></i>,
    },
    {
      title: "Reviews",
      path: "/dashboard/reviews",
      icon: <i className="bi bi-star me-2"></i>,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <i className="bi bi-gear me-2"></i>,
    },
  ];

  return (
    <div className="w-100 bg-body h-100">
      <Stack p={"md"}>
        {userLinks.map((link) => {
          return (
            <NavLink
              key={link.title}
              label={link.title}
              leftSection={link.icon}
              active={location.pathname === link.path}
              variant="filled"
              className="p-3 rounded"
              component={Link}
              to={link.path}
            />
          );
        })}
      </Stack>
    </div>
  );
}

export default DashboardSidebar;
