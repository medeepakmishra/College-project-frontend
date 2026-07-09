import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  User,
  Bell,
  FileText,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const { logout, user } = useAuth();

  const studentMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student/dashboard",
    },
    {
      name: "Profile",
      icon: User,
      path: "/student/profile",
    },
    {
      name: "Companies",
      icon: Building2,
      path: "/student/companies",
    },
    {
      name: "Placement Drives",
      icon: BriefcaseBusiness,
      path: "/student/drives",
    },
    {
      name: "Applications",
      icon: FileText,
      path: "/student/applications",
    },
    {
      name: "Announcements",
      icon: Bell,
      path: "/student/announcements",
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Students",
      icon: User,
      path: "/admin/students",
    },
    {
      name: "Companies",
      icon: Building2,
      path: "/admin/companies",
    },
    {
      name: "Placement Drives",
      icon: BriefcaseBusiness,
      path: "/admin/drives",
    },
    {
      name: "Applications",
      icon: FileText,
      path: "/admin/applications",
    },
    {
      name: "Announcements",
      icon: Bell,
      path: "/admin/announcements",
    },
  ];

  const menu =
    user?.role === "admin"
      ? adminMenu
      : studentMenu;

  return (
    <aside className="w-72 bg-[#090909] border-r border-zinc-800 flex flex-col">

      <div className="p-8 border-b border-zinc-800">

        <h1 className="text-3xl font-bold text-blue-500">
          RMLAU
        </h1>

        <p className="text-zinc-500 mt-2 text-sm">
          Placement Portal
        </p>

      </div>

      <div className="flex-1 px-4 py-6">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="p-5 border-t border-zinc-800">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-5 py-4 hover:bg-red-700 transition"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}