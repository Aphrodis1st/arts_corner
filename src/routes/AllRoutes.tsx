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


const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<ArtsPage />}/>
          <Route path="gallery/single" element={<SingleArtsPage/>}/>
        </Route>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="work" element={<Work/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="roles" element={<Roles/>}/>
        </Route>

        <Route path="*" element={<div className="w-full h-full flex items-center justify-center text-5xl font-black text-blue-950">Page not found</div>} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
