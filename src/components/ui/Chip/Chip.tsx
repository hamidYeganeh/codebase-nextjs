"use client";

import { FC } from "react";
import { cn } from "@/utils/cn";
import { ChipProps } from "./ChipTypes.d";
import { ChipStyles } from "./ChipStyles";

const Chip: FC<ChipProps> = (props) => {
  const { label, onClick, onDelete, deleteIcon, color, size, variant, className } = props;

  const baseClasses = ChipStyles.base({ color, size, variant, clickable: !!onClick });
  const deleteClasses = ChipStyles.delete({ size });

  return (
    <span className={cn(baseClasses, className)} onClick={onClick} role={onClick ? "button" : undefined}>
      <span>{label}</span>
      {onDelete && (
        <button type="button" className={deleteClasses} onClick={onDelete} aria-label="delete">
          {deleteIcon ?? "✕"}
        </button>
      )}
    </span>
  );
};

export default Chip;