import { ActionIcon, Button, NavLink as MantineNavLink } from "@mantine/core";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";
import { useAppSelector } from "../redux/store";
import UserMenu from "../components/UserMenu";
import { useGetCategoriesStateQuery } from "../redux/categories/api";
import LoadingState from "../components/LoadingState";
import { useMemo } from "react";
import SearchForm from "../components/SearchForm";
import NotificationsMenu from "../components/NotificationsMenu";

function RootHeader() {
  const {
    isAuthenticated,
    currentUser: { role },
  } = useAppSelector((state) => state.auth);
  const {
    data,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetCategoriesStateQuery();
  const location = useLocation();
  const topCategories = useMemo(() => {
    if (data) {
      return data.slice(0, 7);
    }
  }, [data]);

  if (isLoadingCategories) {
    return <LoadingState />;
  }

  if (errorCategories) {
    return <div>Error</div>;
  }

  return (
    <div className="vstack gap-2 bg-body py-2">
      <div className="navbar navbar-expand-lg bg-body">
        <div className="container">
          <Link to={"/"} className="navbar-brand text-primary fw-bold">
            FiverrClone
          </Link>

          <div className="d-flex align-items-center gap-2 d-lg-none">
            {!isAuthenticated && (
              <Link className="btn btn-primary btn-sm" to={"/sign-up"}>
                Join now
              </Link>
            )}
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
            <SearchForm className="d-none d-lg-block w-50" />
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
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <NavLink to={"/sign-in"} className="nav-link">
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item d-none d-lg-block">
                    <Button component={Link} to={"/sign-up"}>
                      Join now
                    </Button>
                  </li>
                </>
              )}

              {isAuthenticated && role === "admin" && (
                <li className="nav-item">
                  <NavLink to={"/dashboard"} className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
              )}

              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink to={"/dashboard"} className="nav-link">
                    Switch to seller
                  </NavLink>
                </li>
              )}

              {isAuthenticated && <NotificationsMenu />}
              {isAuthenticated && <UserMenu />}

              <li className="nav-item d-none d-lg-block">
                <ThemeToggler />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* CATEGORIES LINKS */}
      <div className="container d-none d-lg-block">
        <div className="row">
          <div className="col-12">
            <ul className="nav  gap-3">
              {topCategories?.map((category) => (
                <li className="nav-item" key={category._id}>
                  <MantineNavLink
                    component={Link}
                    to={`/explore?category=${category._id}`}
                    label={`${category.name}`}
                    active={location.search === `?category=${category._id}`}
                    className="rounded-1"
                    leftSection={<i className={category.icon}></i>}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootHeader;
