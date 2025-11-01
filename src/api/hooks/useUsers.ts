// libs
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
// stores
import { User } from "@/store/useUserStore";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const getUsers = async () => {
  const response = await apiClient.get("/users", {});
  return response.data as {
    users: Array<User>;
    total: 208;
    skip: 0;
    limit: 30;
  };
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
  });
};
