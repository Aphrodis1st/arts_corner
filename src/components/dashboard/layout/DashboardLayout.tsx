import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import decodeToken from "../../../utils/decode";

const adminItems = [
  { path: "/dashboard", label: "Dashboard", icon: <HomeOutlined /> },
  { path: "/dashboard/users", label: "Users", icon: <UsergroupAddOutlined /> },
  { path: "/dashboard/roles", label: "Roles", icon: <AppstoreOutlined /> },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: <AppstoreOutlined />,
  },
  { path: "/dashboard/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const artistItems = [
  { path: "/dashboard", label: "Dashboard", icon: <HomeOutlined /> },
  { path: "/dashboard/work", label: "My Work", icon: <AppstoreOutlined /> },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: <AppstoreOutlined />,
  },
  { path: "/dashboard/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const DashboardLayout = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = decodeToken(token);

    if (user?.role === "ADMIN") {
      setUserType("ADMIN");
    } else if (user?.role === "ARTIST") {
      setUserType("ARTIST");
    }
  }, []);
  const sidebarItems = userType === "ADMIN" ? adminItems : artistItems;

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-64 bg-[#1e1e1e] p-4 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-500">
              <Link to={"/"}> Art&apos;s corner </Link>
            </h2>
          </div>
          <ul className="space-y-4">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-500"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            to="/dashboard/logout"
            className="flex items-center space-x-3 text-gray-300 hover:text-red-500"
          >
            <LogoutOutlined />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="bg-[#1e1e1e] text-white p-4 shadow-md">
          <h2 className="text-lg font-semibold">Welcome!</h2>
        </div>
        <div className="p-6 flex-grow bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
