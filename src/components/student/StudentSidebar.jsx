import {
  NavLink,
  useNavigate,
} from "react-router-dom";

// import {
//   LayoutDashboard,
//   BriefcaseBusiness,
//   FileText,
//   UserRound,
//   Megaphone,
//   LogOut,
//   X,
// } from "lucide-react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  UserRound,
  Megaphone,
  Brain,
  LogOut,
  X,
} from "lucide-react";


// const menuItems = [

//   {
//     name: "Dashboard",
//     path: "/student/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Eligible Drives",
//     path: "/student/eligible-drives",
//     icon: BriefcaseBusiness,
//   },
//   {
//     name: "My Applications",
//     path: "/student/applications",
//     icon: FileText,
//   },
//   {
//     name: "My Profile",
//     path: "/student/profile",
//     icon: UserRound,
//   },
//   {
//     name: "Announcements",
//     path: "/student/announcements",
//     icon: Megaphone,
//   },
// ];


const menuItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Eligible Drives",
    path: "/student/eligible-drives",
    icon: BriefcaseBusiness,
  },
  {
    name: "My Applications",
    path: "/student/applications",
    icon: FileText,
  },
  {
    name: "My Profile",
    path: "/student/profile",
    icon: UserRound,
  },
  {
    name: "Announcements",
    path: "/student/announcements",
    icon: Megaphone,
  },
  {
    name: "AI Career Center",
    path: "/student/ai",
    icon: Brain,
  },
];


export default function StudentSidebar({
  open,
  setOpen,
}) {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <>

      {open && (

        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
        />

      )}


      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[270px]
          bg-[#0d0d0d]
          border-r border-gray-800
          flex flex-col
          transition-transform duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >


        {/* LOGO */}

        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-800">

          <div>

            <h1 className="text-xl font-bold text-white">
              Placement Portal
            </h1>

            <p className="text-blue-500 text-xs mt-1 tracking-wider">
              STUDENT PORTAL
            </p>

          </div>


          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-400 cursor-pointer"
          >
            <X size={22} />
          </button>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6">

          <p className="text-gray-600 text-xs uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>


          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (

                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={({ isActive }) => `

                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition

                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }

                  `}
                >

                  <Icon size={19} />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                </NavLink>

              );

            })}

          </div>

        </nav>


        {/* LOGOUT */}

        <div className="p-4 border-t border-gray-800">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              text-gray-400
              hover:text-red-400
              hover:bg-red-500/5
              rounded-xl
              transition
              cursor-pointer
            "
          >

            <LogOut size={19} />

            Logout

          </button>

        </div>


      </aside>

    </>

  );

}