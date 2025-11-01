// libs
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// Get users list
export const useUsers = (filters?: string) => {
  return useQuery({
    queryKey: userKeys.list(filters || ""),
    queryFn: async () => {
      const response = await apiClient.get("/users", { params: { filters } });
      return response.data as {
        users: Array<User>;
        total: 208;
        skip: 0;
        limit: 30;
      };
    },
  });
};

// Get a single user
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data as User;
    },
    enabled: !!id, // Only run if id is provided
  });
};

// Create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, "id">) => {
      const response = await apiClient.post("/users", newUser);
      return response.data as User;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
