import { Stack } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function RootFooter() {
  return (
    <footer className="py-5 bg-primary">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
          <div className="col-12">
            <Stack gap={"sm"}>
              <p className="mb-0 text-white fw-bold">Info</p>
              <Link to={"/about"} className="text-white">
                About us
              </Link>
              <Link to={"/contact"} className="text-white">
                Contact us
              </Link>
              <Link to={"/terms"} className="text-white">
                Terms and conditions
              </Link>
              <Link to={"/privacy"} className="text-white">
                Privacy Policy
              </Link>
              <Link to={"/faq"} className="text-white">
                FAQ
              </Link>
              <Link to={"/cookies"} className="text-white">
                Cookies Policy
              </Link>
            </Stack>
          </div>
          <div className="col-12">
            <Stack gap={"sm"}>
              <p className="mb-0 text-white fw-bold">Features</p>
              <Link to={"/invoicing"} className="text-white">
                Invoicing
              </Link>
              <Link to={"/projects"} className="text-white">
                Projects
              </Link>
              <Link to={"/tasks"} className="text-white">
                Tasks
              </Link>
              <Link to={"/users"} className="text-white">
                Users
              </Link>
              <Link to={"/categories"} className="text-white">
                Categories
              </Link>
              <Link to={"/gigs"} className="text-white">
                Gigs
              </Link>
              <Link to={"/payments"} className="text-white">
                Payments
              </Link>
            </Stack>
          </div>
          <div className="col-12">
            <Stack gap={"sm"}>
              <p className="mb-0 text-white fw-bold">Categories</p>
              <Link to={"/categories/1"} className="text-white">
                Management
              </Link>
              <Link to={"/categories/2"} className="text-white">
                UI/UX
              </Link>

              <Link to={"/categories/3"} className="text-white">
                Web Development
              </Link>

              <Link to={"/categories/4"} className="text-white">
                Mobile Development
              </Link>
              <Link to={"/categories/5"} className="text-white">
                Blockchain
              </Link>
              <Link to={"/categories/6"} className="text-white">
                Cloud
              </Link>
              <Link to={"/categories/7"} className="text-white">
                DevOps
              </Link>
            </Stack>
          </div>
          <div className="col-12">
            <Stack gap={"sm"}>
              <p className="mb-0 text-white fw-bold">Useful Links</p>
              <Link to={"/sign-in"} className="text-white">
                Sign in
              </Link>
              <Link to={"/sign-up"} className="text-white">
                Sign up
              </Link>
            </Stack>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Link to={"/"} className="text-white">
                FiverrClone
              </Link>
              <p className="text-white mb-0">
                Copyright © {dayjs().format("YYYY")}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default RootFooter;
