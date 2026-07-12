import api from "../api/axios";

export const analyzeResume = () =>
  api.post("/ai/analyze-resume");