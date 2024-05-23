import { Burger } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";

interface Props {
  toggle: () => void;
  opened: boolean;
}
function DashboardHeader({ toggle, opened }: Props) {
  return (
    <div className="navbar bg-body h-100">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand text-primary fw-bold">
          FiverrClone
        </Link>

        <nav className="navbar-nav ms-auto mb-2 mb-lg-0">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          <ThemeToggler />
        </nav>
      </div>
    </div>
  );
}

export default DashboardHeader;
