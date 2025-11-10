"use client";

// libs
import { useAppTheme } from "@/providers/theme.provider";

export const useTheme = () => {
  const { theme, setTheme, mode, setMode, themes } = useAppTheme();

  return { theme, setTheme, mode, setMode, themes };
};
