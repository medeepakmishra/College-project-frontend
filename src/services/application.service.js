// import api from "../api/axios";

// export const applyToDrive = (driveId) =>
//   api.post("/application/apply", {
//     driveId,
//   });

// export const getMyApplications = () =>
//   api.get("/application/my-application");

// export const getAllApplications = () =>
//   api.get("/application");

// export const getApplicationsByDrive = (
//   driveId
// ) =>
//   api.get(`/application/drive/${driveId}`);

// export const updateApplicationStatus = (
//   id,
//   data
// ) =>
//   api.put(`/application/${id}/status`, data);



import api from "../api/axios";

export const applyToDrive = (driveId) =>
  api.post("/application/apply", {
    driveId,
  });

export const getMyApplications = () =>
  api.get("/application/my-applications");

export const getAllApplications = () =>
  api.get("/application");

export const getApplicationsByDrive = (driveId) =>
  api.get(`/application/drive/${driveId}`);

export const updateApplicationStatus = (id, data) =>
  api.put(`/application/${id}/status`, data);