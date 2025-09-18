"use client";

import * as React from "react";
import { cn } from "./cn";
import type { ButtonVariant, ButtonSize, ButtonColor } from "./types";

/* ---------- Props 먼저 선언(타입 참조 경고 방지) ---------- */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  href?: string; // 존재 시 <a>
  state?: "default" | "active" | "done"; // outline 전용 시각 상태
}

/* ---------- 스타일 토큰 ---------- */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-base rounded-2xl",
  xl: "h-14 px-6 text-base rounded-2xl",
};
const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D]";

/* ---------- tone ---------- */
function solid(color: ButtonColor) {
  switch (color) {
    case "primary":
      return "text-white bg-gradient-to-r from-[#FF5A3D] to-[#FF3D2E] hover:brightness-95 disabled:bg-gray-200 disabled:text-white disabled:opacity-80";
    case "danger":
      return "text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-white";
    default:
      return "text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400";
  }
}

function outline(color: ButtonColor, state: "default" | "active" | "done") {
  const baseOutline = "bg-transparent border";
  if (color === "primary") {
    const brand = "border-[#FF5A3D] text-[#FF5A3D] hover:bg-[#FFF1ED]";
    const active = "bg-[#FFECE7]";
    const done = "border-gray-300 text-gray-400";
    return [
      baseOutline,
      brand,
      state === "active" && active,
      state === "done" && done,
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (color === "danger")
    return `${baseOutline} border-red-500 text-red-600 hover:bg-red-50`;
  return `${baseOutline} border-gray-300 text-gray-700 hover:bg-gray-50`;
}

function ghost(color: ButtonColor) {
  if (color === "primary") return "text-[#FF5A3D] hover:bg-[#FFF1ED]";
  if (color === "danger") return "text-red-600 hover:bg-red-50";
  return "text-gray-700 hover:bg-gray-50";
}

/* ---------- Component ---------- */
export const Button = React.forwardRef<
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
      children,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      base,
      sizeStyles[size],
      fullWidth && "w-full",
      variant === "solid" && solid(color),
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
Button.displayName = "Button";
