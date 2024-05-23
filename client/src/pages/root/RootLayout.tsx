import { Outlet } from "react-router-dom";
import RootHeader from "../../layout/RootHeader";
import RootFooter from "../../layout/RootFooter";

function RootLayout() {
  return (
    <div>
      <RootHeader />
      <Outlet />
      <RootFooter />
    </div>
  );
}

export default RootLayout;
