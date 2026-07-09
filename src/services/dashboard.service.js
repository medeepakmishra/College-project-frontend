import api from "../api/axios";

export const studentDashboard = () =>
    api.get("/dashboard/student");

export const adminDashboard = () =>
    api.get("/dashboard/admin");