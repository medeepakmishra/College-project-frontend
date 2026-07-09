// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Landing from "../pages/public/Landing";
// import Login from "../pages/public/Login";
// import Register from "../pages/public/Register";
// import Drives from "../pages/public/Drives";
// import StudentDashboard from "../pages/student/Dashboard";
// import AdminDashboard from "../pages/admin/Dashboard";
// import MyApplications from "../pages/student/MyApplications";
// import ProtectedRoute from "../components/layout/ProtectedRoute";
// import AdminApplications from "../pages/admin/Applications";
// import AdminStudents from "../pages/admin/Students";
// import StudentLayout from "../components/layout/StudentLayout";
// import AdminLayout from "../components/layout/AdminLayout";
// import ForgotPassword from "../pages/public/ForgotPassword";
// import Profile from "../pages/student/Profile";
// import About from "../pages/public/About";
// import Companies from "../pages/public/Companies";
// import Dashboard from "../pages/admin/Dashboard";
// import AdminCompanies from "../pages/admin/Companies";
// import PublicDrives from "../pages/public/Drives";
// import AdminDrives from "../pages/admin/Drives";
// import EligibleDrives from "../pages/student/EligibleDrives";
// import AdminAnnouncements from "../pages/admin/Announcements";

// import StudentAnnouncements from "../pages/student/Announcements";

// export default function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Student */}

//         <Route
//           element={
//             <ProtectedRoute role="student">
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route
//             path="/student/applications"
//             element={
//               <ProtectedRoute allowedRoles={["student"]}>
//                 <MyApplications />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/students"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminStudents />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/student/dashboard" element={<StudentDashboard />} />
//         </Route>

//         {/* Admin */}

//         <Route
//           element={
//             <ProtectedRoute role="admin">
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         </Route>

//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/profile" element={<Profile />} />

//         <Route path="/about" element={<About />} />

//         <Route path="/companies" element={<Companies />} />

//         <Route path="/admin" element={<Dashboard />} />

//         <Route path="/admin/companies" element={<AdminCompanies />} />

//         <Route path="/drives" element={<PublicDrives />} />

//         <Route path="/admin/drives" element={<AdminDrives />} />
//         <Route path="/admin/applications" element={<AdminApplications />} />
//         <Route path="/student/eligible-drives" element={<EligibleDrives />} />
//         <Route
//           path="/admin/announcements"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminAnnouncements />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student/announcements"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <StudentAnnouncements />
//             </ProtectedRoute>
//           }
//         />
//         {/* <Route path="/companies/:id" element={<CompanyDetails />} />

//         <Route path="/drives" element={<Drives />} />

//         <Route path="/drives/:id" element={<DriveDetails />} /> */}
//         <Route path="/drives" element={<Drives />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }










import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// ================================
// PUBLIC PAGES
// ================================

import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import About from "../pages/public/About";
import PublicCompanies from "../pages/public/Companies";
import PublicDrives from "../pages/public/Drives";


// ================================
// STUDENT PAGES
// ================================

import StudentDashboard from "../pages/student/Dashboard";
import MyApplications from "../pages/student/MyApplications";
import Profile from "../pages/student/Profile";
import EligibleDrives from "../pages/student/EligibleDrives";
import StudentAnnouncements from "../pages/student/Announcements";


// ================================
// ADMIN PAGES
// ================================

import AdminDashboard from "../pages/admin/Dashboard";
import AdminCompanies from "../pages/admin/Companies";
import AdminDrives from "../pages/admin/Drives";
import AdminApplications from "../pages/admin/Applications";
import AdminStudents from "../pages/admin/Students";
import AdminAnnouncements from "../pages/admin/Announcements";


// ================================
// LAYOUTS
// ================================

import StudentLayout from "../components/layout/StudentLayout";
import AdminLayout from "../components/layout/AdminLayout";


// ================================
// PROTECTION
// ================================

import ProtectedRoute from "../components/layout/ProtectedRoute";


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================
            PUBLIC ROUTES
        ================================= */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/companies"
          element={<PublicCompanies />}
        />

        <Route
          path="/drives"
          element={<PublicDrives />}
        />


        {/* =================================
            STUDENT PROTECTED ROUTES
        ================================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
            >
              <StudentLayout />
            </ProtectedRoute>
          }
        >

          {/* /student → dashboard */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />


          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />


          <Route
            path="profile"
            element={<Profile />}
          />


          <Route
            path="eligible-drives"
            element={<EligibleDrives />}
          />


          <Route
            path="applications"
            element={<MyApplications />}
          />


          <Route
            path="announcements"
            element={<StudentAnnouncements />}
          />


        </Route>


        {/* =================================
            ADMIN PROTECTED ROUTES
        ================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* /admin → dashboard */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />


          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />


          <Route
            path="companies"
            element={<AdminCompanies />}
          />


          <Route
            path="drives"
            element={<AdminDrives />}
          />


          <Route
            path="applications"
            element={<AdminApplications />}
          />


          <Route
            path="students"
            element={<AdminStudents />}
          />


          <Route
            path="announcements"
            element={<AdminAnnouncements />}
          />


        </Route>


        {/* =================================
            UNKNOWN ROUTE
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />


      </Routes>

    </BrowserRouter>

  );

}