import api from "../api/axios";

export const getCompanies = () =>
    api.get("/company");

export const getCompany = (id) =>
    api.get(`/company/${id}`);

export const createCompany = (data) =>
    api.post("/company", data);

export const updateCompany = (id, data) =>
    api.put(`/company/${id}`, data);

export const deleteCompany = (id) =>
    api.delete(`/company/${id}`);