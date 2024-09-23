import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ArtsPage from "../pages/ArtsPage";
import SingleArtsPage from "../pages/SingleArtsPage";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import Dashboard from "../components/dashboard/components/Dashboard";
import Users from "../components/dashboard/components/Users";
import Work from "../components/dashboard/components/Work";
import Settings from "../components/dashboard/components/Settings";
import Roles from "../components/dashboard/components/Roles";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ProtectedRoute from "../utils/ProtectedRoute";
import UpdateWork from "../components/dashboard/components/common/UpdateWork";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<ArtsPage />} />
          <Route path="gallery/:id" element={<SingleArtsPage />} />
        </Route>

        {/* Protected routes for both ADMIN and ARTIST */}
        <Route element={<ProtectedRoute requiredRoles={["ADMIN", "ARTIST"]} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:id" element={<UpdateWork />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Protected routes for ADMIN only */}
        <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
          </Route>
        </Route>

        {/* Route for unauthorized access */}
        <Route path="/unauthorized" element={<Login />} />

        {/* Fallback route for 404 - Page not found */}
        <Route
          path="*"
          element={
            <div className="w-full h-full flex items-center justify-center text-5xl font-black text-blue-950">
              Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
