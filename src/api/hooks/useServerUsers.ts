import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@/store/useUserStore';

// Query keys for caching and invalidation
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Server-side compatible fetcher function
export const fetchUsers = async (): Promise<User[]> => {
  // Use absolute URL for server-side fetching
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await axios.get(`${baseUrl}/api/users`);
  return response.data;
};

// Client-side hook that uses the same query key
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
  });
};