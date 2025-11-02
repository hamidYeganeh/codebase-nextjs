// libs
import { create } from "zustand";
import { persist } from "zustand/middleware";
// types
import { IUser } from "@/types/UserTypes";

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
