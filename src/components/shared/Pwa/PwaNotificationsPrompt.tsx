"use client";

// libs
import { usePushNotifications } from "@/hooks/usePushNotifications";
// configs
import { VAPID_PUBLIC_KEY } from "@/configs/pwa.config";

export const PwaNotificationsPrompt = () => {
  const {
    isSupported,
    permission,
    isLoading,
    enableNotifications,
    disableNotifications,
  } = usePushNotifications({ VAPID_PUBLIC_KEY });

  if (!isSupported) return null;

  return (
    <div className="flex gap-2 items-center">
      {permission !== "granted" ? (
        <button onClick={enableNotifications} disabled={isLoading}>
          Enable Notifications
        </button>
      ) : (
        <button
          onClick={disableNotifications}
          color="warning"
          disabled={isLoading}
        >
          Disable Notifications
        </button>
      )}
    </div>
  );
};
