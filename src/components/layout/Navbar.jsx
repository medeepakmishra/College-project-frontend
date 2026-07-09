import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <header className="h-20 bg-[#111111] border-b border-zinc-800 px-8 flex items-center justify-between">
      {/* Search */}

      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* Notification */}

        <button className="relative">
          <Bell
            size={23}
            className="text-zinc-300 cursor-pointer hover:text-white"
          />

          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="text-left hidden md:block">
              <h4 className="text-white font-semibold">{user?.name}</h4>

              <p className="text-zinc-500 text-sm capitalize">{user?.role}</p>
            </div>

            <ChevronDown size={18} className="text-zinc-400" />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-[#1a1a1a] border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
              <button className="w-full px-5 py-3 text-left hover:bg-zinc-800 text-white">
                My Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full px-5 py-3 text-left hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
