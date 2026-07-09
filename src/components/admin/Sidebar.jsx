import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
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
    name: "Students",
    icon: Users,
    path: "/admin/students",
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

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111111] border-r border-zinc-800 flex flex-col">

      <div className="h-20 flex items-center justify-center border-b border-zinc-800">

        <h1 className="text-2xl font-bold text-white">

          RMLAU

          <span className="text-blue-500">
            Admin
          </span>

        </h1>

      </div>

      <div className="flex-1 px-3 py-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink

              key={item.name}

              to={item.path}

              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`
              }

            >

              <Icon size={20} />

              {item.name}

            </NavLink>

          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800">

        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}