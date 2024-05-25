import React, { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: React.PropsWithChildren<{}>) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
