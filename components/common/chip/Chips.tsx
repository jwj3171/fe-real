"use client";

import * as React from "react";
import { cn } from "./cn";
import type { ChipVariant, ChipSize, ChipColor } from "./types";

/**
 * 공용 Chip
 * - variant: "solid" | "outline"
 * - color:   "primary"(주황) | "neutral"(회색)
 * - selected: outline 에서 선택 상태 표현 (primary 배경/테두리로 변경)
 * - leftIcon: 이사유형 등 아이콘 칩
 */
export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
  selected?: boolean;
  leftIcon?: React.ReactNode;
}

const sizeStyles: Record<ChipSize, string> = {
  sm: "h-8 px-3 text-sm rounded-full",
  md: "h-10 px-4 text-base rounded-full", // 기본
  lg: "h-11 px-5 text-base rounded-full",
};

const base =
  "inline-flex items-center gap-2 shrink-0 justify-center font-medium " +
  "transition-colors focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D]";

function tone(variant: ChipVariant, color: ChipColor, selected?: boolean) {
  if (variant === "solid") {
    if (color === "primary")
      // 연한 주황 배경 + 주황 텍스트 (주소 칩, 이사유형 칩)
      return "border border-transparent bg-[#FEEEEA] text-[#F9502E] hover:bg-[#FFE3DC]";
    // neutral solid(필요시)
    return "border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200";
  }

  // outline
  if (selected) {
    // 선택시 주황 테두리 + 연주황 배경
    return "border border-[#F9502E] bg-[#FEEEEA] text-[#F9502E]";
  }
  if (color === "primary") {
    return "border border-[#F9502E] text-[#F9502E] bg-transparent hover:bg-[#FFF1ED]";
  }
  // neutral outline (지역 칩 기본)
  return "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50";
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant = "outline",
      color = "neutral",
      size = "md",
      selected,
      leftIcon,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      base,
      sizeStyles[size],
      tone(variant, color, selected),
      className
    );

    return (
      <button ref={ref} className={classes} {...rest}>
        {leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        <span className="truncate">{children}</span>
      </button>
    );
  }
);
Chip.displayName = "Chip";
