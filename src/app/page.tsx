"use client";

import { Button } from "@/ui/Button";
import { useAppTheme } from "@/providers/theme.provider";

export default function Home() {
  const { setMode, setTheme, mode, theme } = useAppTheme();
  return (
    <main className="min-h-screen w-full py-10 px-4 sm:px-8 space-y-10 dark:bg-primary-500 bg-primary-200">
      <h1 suppressHydrationWarning>{`${mode}, ${theme}`}</h1>
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
      <div>
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
      </div>
    </main>
  );
}
