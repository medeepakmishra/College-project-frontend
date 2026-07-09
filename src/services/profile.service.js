import api from "../api/axios";

export const createProfile = (data) =>
    api.post("/profile", data);

export const getMyProfile = () =>
    api.get("/profile/me");

export const updateProfile = (data) =>
    api.put("/profile", data);

export const getAllStudents = () =>
    api.get("/profile/all");

export const getStudent = (id) =>
    api.get(`/profile/${id}`);

export const deleteStudent = (id) =>
    api.delete(`/profile/${id}`);