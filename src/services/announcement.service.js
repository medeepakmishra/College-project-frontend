import api from "../api/axios";

export const getAnnouncements = () =>
    api.get("/announcement");

export const getAnnouncement = (id) =>
    api.get(`/announcement/${id}`);

export const createAnnouncement = (data) =>
    api.post("/announcement", data);

export const updateAnnouncement = (id, data) =>
    api.put(`/announcement/${id}`, data);

export const deleteAnnouncement = (id) =>
    api.delete(`/announcement/${id}`);