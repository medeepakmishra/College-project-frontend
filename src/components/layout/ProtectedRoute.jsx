import { Navigate } from "react-router-dom";


export default function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const token =
    localStorage.getItem("token");


  let user = null;


  try {

    user = JSON.parse(
      localStorage.getItem("user")
    );

  } catch (error) {

    user = null;

  }


  // NOT LOGGED IN

  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // WRONG ROLE

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {

    if (user.role === "admin") {

      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );

    }


    if (user.role === "student") {

      return (
        <Navigate
          to="/student/dashboard"
          replace
        />
      );

    }


    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}