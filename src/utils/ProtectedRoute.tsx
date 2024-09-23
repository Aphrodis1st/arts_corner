/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// @ts-nocheck

import { Navigate, Outlet } from "react-router-dom";
import decodeToken from "./decode";

const ProtectedRoute = ({ requiredRoles }: { requiredRoles: string[] }) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    decodeToken(token);
  } else {
    console.error("No token found");
  }

  const user = decodeToken(token);

  if (!requiredRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
