"use client";

// configs
import { LOCALES_LIST } from "@/configs/i18n.config";
// libs
import { useI18nContext } from "@/providers/i18n.provider";

export const useI18n = () => {
  const i18nContext = useI18nContext();

  return {
    ...i18nContext,
    locales: LOCALES_LIST,
  };
};
