// libs
import { getStrictContext } from "@/lib/getStrictContext";
// types
import type {
  DropdownMenuContextType,
  DropdownMenuSubContextType,
} from "./DropdownTypes";

export const [DropdownMenuProvider, useDropdownMenu] =
  getStrictContext<DropdownMenuContextType>("DropdownMenuContext");

export const [DropdownMenuSubProvider, useDropdownMenuSub] =
  getStrictContext<DropdownMenuSubContextType>("DropdownMenuSubContext");
