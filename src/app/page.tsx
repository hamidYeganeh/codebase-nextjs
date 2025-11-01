"use client";

import { Button } from "@/ui/Button";
import { useAppTheme } from "@/providers/theme.provider";
import { List, ListItem } from "@/components/ui/List";
import { useTranslations } from "next-intl";
import { StateManagementExample } from "@/components/examples/StateManagementExample";

export default function Home() {
  const { setMode, setTheme, mode, theme } = useAppTheme();
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen w-full py-10 px-4 sm:px-8 space-y-10 dark:bg-primary-900 bg-primary-200">
      <h1 suppressHydrationWarning>{`${mode}, ${theme}`}</h1>
      <List size={"xl"} variant={"light"} color="success" radius={"md"}>
        <ListItem color={"warning"} size={"xs"} variant={"ghost"}>
          {t("subtitle")}
        </ListItem>
        <ListItem>How Are You</ListItem>
      </List>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">State Management Example</h2>
        <StateManagementExample />
        <div className="mt-4">
          <a
            href="/server-demo"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Server-Side API Demo
          </a>
        </div>
      </div>

      <div>
        <Button
          color={"warning"}
          onClick={() => {
            setMode("LIGHT");
          }}
        >
          Light
        </Button>
        <Button
          color={"success"}
          onClick={() => {
            setMode("DARK");
          }}
        >
          Dark
        </Button>
      </div>
      <div className="bg-red-500">
        <Button
          onClick={() => {
            setTheme("SHIRAZ");
          }}
        >
          Shiraz
        </Button>
        <Button
          onClick={() => {
            setTheme("BLUEBERRY");
          }}
        >
          BLUEBERRY
        </Button>
        <Button
          onClick={() => {
            setTheme("WATERCOURSE");
          }}
        >
          WATERCOURSE
        </Button>
      </div>
    </main>
  );
}
