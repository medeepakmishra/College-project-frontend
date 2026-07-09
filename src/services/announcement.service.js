import api from "../api/axios";

export const getAnnouncements = () =>
    api.get("/announcements");

export const getAnnouncement = (id) =>
    api.get(`/announcements/${id}`);

export const createAnnouncement = (data) =>
    api.post("/announcements", data);

export const updateAnnouncement = (id, data) =>
    api.put(`/announcements/${id}`, data);

export const deleteAnnouncement = (id) =>
    api.delete(`/announcements/${id}`);