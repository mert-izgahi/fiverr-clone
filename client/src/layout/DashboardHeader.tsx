import { Burger } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";
import { useAppSelector } from "../redux/store";
import UserMenu from "../components/UserMenu";
import NotificationsMenu from "../components/NotificationsMenu";

interface Props {
  toggle: () => void;
  opened: boolean;
}
function DashboardHeader({ toggle, opened }: Props) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <div className="navbar bg-body h-100">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand text-primary fw-bold">
          FiverrClone
        </Link>

        <nav className="navbar-nav ms-auto mb-2 mb-lg-0">
          <div className="d-flex gap-3 align-items-center ">
            {isAuthenticated && <NotificationsMenu />}
            {isAuthenticated && <UserMenu />}
            <ThemeToggler />
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default DashboardHeader;
