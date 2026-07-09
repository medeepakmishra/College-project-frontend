import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Menu,
  Bell,
  UserRound,
} from "lucide-react";

import AdminSidebar
  from "../admin/AdminSidebar";


export default function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  let user = null;


  try {

    user = JSON.parse(
      localStorage.getItem("user")
    );

  } catch {

    user = null;

  }


  return (

    <div className="min-h-screen bg-[#090909]">


      {/* SIDEBAR */}

      <AdminSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />


      {/* MAIN AREA */}

      <div className="lg:ml-[270px] min-h-screen">


        {/* TOP BAR */}

        <header
          className="
            sticky top-0 z-30
            h-20
            bg-[#090909]/90
            backdrop-blur-xl
            border-b border-gray-800
            px-5 md:px-8
            flex items-center justify-between
          "
        >


          <div className="flex items-center gap-4">


            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
                lg:hidden
                w-10 h-10
                flex items-center justify-center
                border border-gray-800
                rounded-xl
                text-gray-400
                hover:text-white
                cursor-pointer
              "
            >
              <Menu size={21} />
            </button>


            <div>

              <p className="text-white font-medium">
                Admin Center
              </p>

              <p className="text-gray-600 text-xs mt-1">
                Placement Management System
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-3">


            <button
              className="
                w-10 h-10
                flex items-center justify-center
                border border-gray-800
                rounded-xl
                text-gray-400
                hover:text-white
                hover:border-gray-700
                cursor-pointer
              "
            >
              <Bell size={19} />
            </button>


            <div className="hidden sm:flex items-center gap-3 pl-3">

              <div
                className="
                  w-10 h-10
                  bg-blue-600/10
                  text-blue-400
                  rounded-xl
                  flex items-center justify-center
                "
              >
                <UserRound size={19} />
              </div>


              <div>

                <p className="text-white text-sm font-medium">
                  {user?.name ||
                    "Placement Admin"}
                </p>

                <p className="text-gray-600 text-xs">
                  Administrator
                </p>

              </div>

            </div>


          </div>


        </header>


        {/* PAGE CONTENT */}

        <main>

          <Outlet />

        </main>


      </div>


    </div>

  );

}