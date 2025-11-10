"use client";

// libs
import { usePwaInstall } from "@/hooks/usePwaInstall";

export const PwaInstallPrompt = () => {
  const { isDismissed, isSupported, onDismiss, onInstall } = usePwaInstall();

  if (!isSupported || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50">
      <div className="flex items-center gap-3 p-4 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <p className="text-sm font-medium">✨ Install the App</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Add to your home screen for a native-like experience.
          </p>
        </div>
        <button onClick={onInstall}>Install</button>
        <button onClick={onDismiss}>Later</button>
      </div>
    </div>
  );
};
