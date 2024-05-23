import { ActionIcon, Button } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";

function RootHeader() {
  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container">
        <Link to={"/"} className="navbar-brand text-primary fw-bold">
          FiverrClone
        </Link>

        <div className="d-flex align-items-center gap-2 d-lg-none">
          <Link className="btn btn-primary btn-sm" to={"/sign-up"}>
            Join now
          </Link>
          <ThemeToggler />
          <ActionIcon
            className="btn btn-ghost d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list me-2"></i>
          </ActionIcon>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3 align-items-center">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/explore"} className="nav-link">
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/sign-in"} className="nav-link">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item d-none d-lg-block">
              {/* <Link to={"/sign-up"} className="btn btn-primary">
                Join now
              </Link> */}
              <Button>Join now</Button>
            </li>
            <li className="nav-item d-none d-lg-block">
              <ThemeToggler />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RootHeader;
