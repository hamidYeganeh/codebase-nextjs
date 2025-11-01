export enum THEMES {
  SHIRAZ = "shiraz",
  BLUEBERRY = "blueberry",
  WATERCOURSE = "watercourse",
}
export enum THEME_MODES {
  LIGHT = "light",
  DARK = "dark",
}
export const DEFAULT_THEME: keyof typeof THEMES = "SHIRAZ";
export const DEFAULT_THEME_MODE: keyof typeof THEME_MODES = "LIGHT";
export const THEME_ATTRIBUTE = "data-theme";
