"use client";

import * as React from "react";
import { cn } from "./cn";
import type { ChipVariant, ChipSize, ChipColor } from "./types";

/**
 * 공용 Chip 컴포넌트
 *
 * - variant: "solid" | "outline"
 * - color:   "primary"(주황) | "neutral"(회색)
 * - selected: outline일 때 선택 상태 표현 (primary 테두리/배경)
 * - leftIcon: 아이콘(선택)
 *
 * 접근성:
 * - selected가 주어지면 aria-pressed로 토글형 버튼처럼 읽히도록 함
 */
export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
  selected?: boolean;
  leftIcon?: React.ReactNode;
}

/* ----------------------------- 사이즈 토큰 ----------------------------- */
const sizeStyles: Record<ChipSize, string> = {
  xs: "h-4 px-1 text-xs rounded-full",
  sm: "h-8 px-3 text-sm rounded-full",
  md: "h-10 px-4 text-base rounded-full", // 기본
  lg: "h-11 px-5 text-base rounded-full",
};

/* ------------------------------ 베이스 공통 ----------------------------- */
const base =
  "inline-flex items-center justify-center gap-2 shrink-0 font-medium " +
  "transition-colors focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D] " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

/* ------------------------------ 색/톤 조합 ------------------------------ */
function tone(variant: ChipVariant, color: ChipColor, selected?: boolean) {
  if (variant === "solid") {
    if (color === "primary") {
      // 연주황 배경 + 주황 텍스트(주소/이사유형 등)
      return "border border-transparent bg-[#FEEEEA] text-[#F9502E] hover:bg-[#FFE3DC]";
    }
    // neutral(필요 시)
    return "border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200";
  }

  // outline
  if (selected) {
    // 선택 시: 주황 테두리 + 연주황 배경
    return "border border-[#F9502E] bg-[#FEEEEA] text-[#F9502E]";
  }

  if (color === "primary") {
    // 기본: 투명 배경 + 주황 테두리/텍스트, hover 시 연한 주황 배경
    return "border border-[#F9502E] text-[#F9502E] bg-transparent hover:bg-[#FFF1ED]";
  }

  // neutral 기본(지역 칩 등)
  return "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50";
}

/* --------------------------------- 컴포넌트 -------------------------------- */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant = "outline",
      color = "neutral",
      size = "xs",
      selected,
      leftIcon,
      children,
      type, // form 안에서도 기본 submit 방지
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
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        aria-pressed={selected}
        data-selected={selected ? "true" : "false"}
        {...rest}
      >
        {leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        <span className="truncate">{children}</span>
      </button>
    );
  }
);
Chip.displayName = "Chip";
