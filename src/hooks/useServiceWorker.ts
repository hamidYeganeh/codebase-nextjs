"use client";

// libs
import { useEffect, useRef } from "react";

const UPDATE_EVENT_NAME = "pwa:update-available";
const SERVICE_WORKER_PATH = "/sw.js";
const SCOPE = "/";

export const useServiceWorker = () => {
  const isRegisteredRef = useRef(false);

  useEffect(() => {
    if (isRegisteredRef.current) return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      if (isRegisteredRef.current) return;

      try {
        const registration = await navigator.serviceWorker.register(
          SERVICE_WORKER_PATH,
          { scope: SCOPE }
        );
        isRegisteredRef.current = true;
        console.log("Service Worker registered successfully.", registration);

        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.onstatechange = () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New Service Worker installed, signaling update.");
              window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME));
            }
          };
        };
      } catch (err) {
        console.error("Service Worker registration failed:", err);
      }
    };

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker, { once: true });
    }

    return () => {
      window.removeEventListener("load", registerServiceWorker);
    };
  }, []);
  return {};
};
