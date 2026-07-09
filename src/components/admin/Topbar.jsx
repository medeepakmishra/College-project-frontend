import { Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-[#111111] border-b border-zinc-800 flex justify-between items-center px-8">

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          placeholder="Search..."
          className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-xl py-3 pl-12 outline-none focus:border-blue-500 text-white"
        />

      </div>

      <div className="flex items-center gap-3">

        <UserCircle
          size={38}
          className="text-blue-500"
        />

        <div>

          <h2 className="text-white font-semibold">

            Super Admin

          </h2>

          <p className="text-zinc-500 text-sm">

            Placement Cell

          </p>

        </div>

      </div>

    </header>
  );
}