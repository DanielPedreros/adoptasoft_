// src/infrastructure/repositories/userRepository.js
import { httpClient } from "../api/httpClient";

export const userRepository = {
  list: () => httpClient.get("/users"),
  create: (payload) => httpClient.post("/users", payload),
  remove: (id) => httpClient.delete(`/users/${id}`),
};
