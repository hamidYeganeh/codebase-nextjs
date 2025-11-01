// libs
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
// configs
import { COOKIE_KEYS } from "@/configs/storage.config";
import { DEFAULT_LOCALE } from "@/configs/i18n.config";

type Locale = "en" | "de";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_KEYS.LOCALE)?.value;

  const locale = (cookieLocale ?? DEFAULT_LOCALE) as Locale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
