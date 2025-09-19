"use client";

import * as React from "react";
import { cn } from "./cn";
import type { ButtonVariant, ButtonSize, ButtonColor } from "./types";

/**
 * 사용 예) Figma 스펙(327x54, radius 12, #F9502E 단색)
 * <Button size="figma" flat className="w-[327px]">Primary CTA 버튼</Button>
 */

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ButtonVariant; // "solid" | "outline" | "ghost"
  size?: ButtonSize; // "sm" | "md" | "lg" | "xl" | "figma"
  color?: ButtonColor; // "primary" | "neutral" | "danger"
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  href?: string; // 존재 시 <a>
  state?: "default" | "active" | "done"; // outline 전용 시각 상태
  flat?: boolean; // solid일 때 단색(그라데이션 X)
}

// ...상단 import/타입 동일

/* ---------- 사이즈 토큰(그대로) ---------- */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9  px-3 text-sm rounded-lg",
  md: "h-11 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-base rounded-2xl",
  xl: "h-14 px-6 text-base rounded-2xl",
  figma: "h-[54px] px-4 text-base rounded-[12px]", // 16px padding
};

/* ---------- 베이스 (🔧 shrink-0 추가) ---------- */
const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors " +
  "shrink-0 " + // 🔧 flex-shrink: 0
  "disabled:cursor-not-allowed focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D]";

/* ---------- 공통 토큰 ---------- */
const SHADOW_SOFT = "shadow-[4px_4px_10px_rgba(195,217,242,0.20)]"; // 🔧 outline용 그림자
const DISABLED_SOLID =
  "disabled:bg-none disabled:bg-[#D9D9D9] disabled:text-white disabled:opacity-100"; // 🔧 solid 비활성 고정색

/* ---------- solid(그라데이션/단색) ---------- */
function solidGradient(color: ButtonColor) {
  switch (color) {
    case "primary":
      return `text-white bg-gradient-to-r from-[#FF5A3D] to-[#FF3D2E] hover:brightness-95 ${DISABLED_SOLID}`;
    case "danger":
      return `text-white bg-red-600 hover:bg-red-700 ${DISABLED_SOLID}`;
    default:
      return `text-gray-800 bg-gray-100 hover:bg-gray-200 ${DISABLED_SOLID}`;
  }
}

function solidFlat(color: ButtonColor) {
  switch (color) {
    case "primary":
      return `text-white bg-[#F9502E] hover:brightness-95 ${DISABLED_SOLID}`; // 🔧 단색
    case "danger":
      return `text-white bg-red-600 hover:bg-red-700 ${DISABLED_SOLID}`;
    default:
      return `text-gray-800 bg-gray-100 hover:bg-gray-200 ${DISABLED_SOLID}`;
  }
}

/* ---------- outline(🔧 패딩/그림자/상태) ---------- */
function outline(color: ButtonColor, state: "default" | "active" | "done") {
  // 🔧 px-6(=24px), 그림자 공통
  const baseOutline = `bg-transparent border px-6 ${SHADOW_SOFT}`;

  if (color === "primary") {
    const brand = "border-[#F9502E] text-[#F9502E] hover:bg-[#FFF1ED]";
    const active = "bg-[#FEEEEA]"; // 🔧 상태 4
    const done = "border-[#C4C4C4] text-gray-500"; // 🔧 상태 5
    return [
      baseOutline,
      brand,
      state === "active" && active,
      state === "done" && done,
    ]
      .filter(Boolean)
      .join(" ");
  }

  // 기타 색은 회색 테두리
  return `${baseOutline} border-gray-300 text-gray-700 hover:bg-gray-50`;
}

/* ---------- ghost 그대로 ---------- */
function ghost(color: ButtonColor) {
  if (color === "primary") return "text-[#FF5A3D] hover:bg-[#FFF1ED]";
  if (color === "danger") return "text-red-600 hover:bg-red-50";
  return "text-gray-700 hover:bg-gray-50";
}

// 아래 Component 본문은 기존과 동일 (classes 조합 로직은 그대로)

/* ------------------------- component ------------------------- */
export const Buttons = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "solid",
      size = "lg",
      color = "primary",
      fullWidth,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      href,
      state = "default",
      flat = false,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      base,
      sizeStyles[size],
      fullWidth && "w-full",
      variant === "solid" && (flat ? solidFlat(color) : solidGradient(color)),
      variant === "outline" && outline(color, state),
      variant === "ghost" && ghost(color),
      className
    );

    const content = (
      <>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        {loading && (
          <span
            aria-hidden
            className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"
          />
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-disabled={disabled || loading}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={classes}
        disabled={disabled || loading}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
Buttons.displayName = "Button";
