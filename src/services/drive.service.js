import api from "../api/axios";

export const getDrives = () =>
    api.get("/drive");

export const getEligibleDrives = () =>
    api.get("/drive/eligible");

export const getDrive = (id) =>
    api.get(`/drive/${id}`);

export const createDrive = (data) =>
    api.post("/drive", data);

export const updateDrive = (id, data) =>
    api.put(`/drive/${id}`, data);

export const deleteDrive = (id) =>
    api.delete(`/drive/${id}`);