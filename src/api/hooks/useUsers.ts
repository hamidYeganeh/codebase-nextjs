// libs
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
// configs
import { Endpoints } from "@/configs/api.config";
// types
import type { IUsers } from "@/types/UserTypes";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const getUsers = async () => {
  const response = await apiClient.get(Endpoints.users.list, {});
  return response.data as IUsers;
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
  });
};
