import { NavLink, Stack } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  const links = [
    {
      title: "Overview",
      path: "/dashboard",
      isActive: location.pathname === "/dashboard",
      icon: <i className="bi bi-house me-2"></i>,
    },
    {
      title: "Categories",
      path: "/dashboard/categories",
      isActive: location.pathname === "/dashboard/categories",
      icon: <i className="bi bi-grid me-2"></i>,
    },
    {
      title: "Gigs",
      path: "/dashboard/gigs",
      isActive: location.pathname === "/dashboard/gigs",
      icon: <i className="bi bi-book me-2"></i>,
    },
    {
      title: "Orders",
      path: "/dashboard/orders",
      isActive: location.pathname === "/dashboard/orders",
      icon: <i className="bi bi-cart me-2"></i>,
    },
    {
      title: "Conversations",
      path: "/dashboard/conversations",
      isActive: location.pathname === "/dashboard/conversations",
      icon: <i className="bi bi-chat me-2"></i>,
    },
  ];

  return (
    <div className="w-100 bg-body h-100">
      <Stack p={"md"}>
        {links.map((link) => {
          return (
            <NavLink
              key={link.title}
              label={link.title}
              leftSection={link.icon}
              active={link.isActive}
              variant="filled"
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
