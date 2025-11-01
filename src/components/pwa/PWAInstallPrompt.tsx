"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PWAInstallPrompt() {
  const [supportsInstall, setSupportsInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setSupportsInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setSupportsInstall(false);
      setDeferredPrompt(null);
    }
  };

  if (!supportsInstall || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50">
      <div className="flex items-center gap-3 p-4 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <p className="text-sm font-medium">Install this app</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Add to your home screen for a native-like experience.</p>
        </div>
        <Button variant="flat" color="success" onClick={onInstall}>Install</Button>
        <Button variant="ghost" color="warning" onClick={() => setDismissed(true)}>Dismiss</Button>
      </div>
    </div>
  );
}