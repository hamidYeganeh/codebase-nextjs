import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_THEME,
  DEFAULT_THEME_MODE,
  THEMES,
  THEME_MODES,
} from "@/configs/theme.config";
import { LOCAL_STORAGE_KEYS } from "@/configs/storage.config";

interface ThemeState {
  theme: keyof typeof THEMES;
  mode: keyof typeof THEME_MODES;
  setTheme: (theme: keyof typeof THEMES) => void;
  setMode: (mode: keyof typeof THEME_MODES) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      mode: DEFAULT_THEME_MODE,
      setTheme: (theme) => set({ theme }),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.THEME,
    }
  )
);
