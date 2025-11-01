import type EN_MESSAGES from "../messages/en.json";
type DeepMessages = typeof EN_MESSAGES;

declare module "next-intl" {
  interface AppConfig {
    Messages: DeepMessages;
    Locale: "en" | "de";
  }
}
