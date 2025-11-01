import axios from "axios";

// Server-side axios client for DummyJSON users API
export const usersApi = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export async function getUsers(params?: Record<string, string | number>) {
  const { data } = await usersApi.get("/users", { params });
  return data; // { users: [...], total, skip, limit }
}

export async function getUserById(id: string | number) {
  const { data } = await usersApi.get(`/users/${id}`);
  return data; // single user object
}