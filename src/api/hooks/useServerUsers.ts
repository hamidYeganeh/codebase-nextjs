import { useQuery } from "@tanstack/react-query";
import { User } from "@/store/useUserStore";
import { apiClient } from "../client";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const fetchUsers = async (): Promise<{
  users: User[];
  total: 208;
  skip: 0;
  limit: 30;
}> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
  });
};
