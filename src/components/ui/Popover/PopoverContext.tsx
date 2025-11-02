"use client";

// libs
import { getStrictContext } from "@/lib/getStrictContext";
// types
import type { IPopoverContext } from "./PopoverTypes";

export const [PopoverProvider, usePopoverContext] =
  getStrictContext<IPopoverContext>("PopoverProvider");
