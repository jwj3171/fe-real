"use client";

import * as React from "react";
import { cn } from "./cn";
import type { IconVariant, IconSize, IconColor } from "./types";

const sizeMap: Record<IconSize, string> = {
  sm: "h-8 w-8 text-[16px]",
  md: "h-10 w-10 text-[18px]",
  lg: "h-12 w-12 text-[20px]",
};
const baseFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D]";

function tone(variant: IconVariant, color: IconColor, selected?: boolean) {
  if (variant === "filled") {
    if (color === "primary")
      return "bg-gradient-to-r from-[#FF5A3D] to-[#FF3D2E] text-white hover:brightness-95";
    if (color === "kakao") return "bg-[#FEE500] text-black hover:brightness-95";
    if (color === "facebook")
      return "bg-[#1877F2] text-white hover:brightness-95";
    if (color === "white") return "bg-white text-gray-700 hover:bg-gray-50";
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
  if (variant === "outline") {
    if (color === "primary") {
      return [
        "border border-[#FF5A3D] text-[#FF5A3D] hover:bg-[#FFF1ED]",
        selected && "bg-[#FFECE7]",
      ]
        .filter(Boolean)
        .join(" ");
    }
    return "border border-gray-300 text-gray-700 hover:bg-gray-50";
  }
  return color === "primary"
    ? "text-[#FF5A3D] hover:bg-[#FFF1ED]"
    : "text-gray-700 hover:bg-gray-50";
}

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor;
  rounded?: "md" | "xl" | "full";
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
}

export const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(
  (
    {
      className,
      size = "md",
      variant = "outline",
      color = "neutral",
      rounded = "xl",
      selected,
      href,
      children,
      ...rest
    },
    ref
  ) => {
    const roundedClass =
      rounded === "full"
        ? "rounded-full"
        : rounded === "xl"
        ? "rounded-2xl"
        : "rounded-lg";

    const classes = cn(
      "inline-grid place-items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      baseFocus,
      sizeMap[size],
      roundedClass,
      tone(variant, color, selected),
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          aria-pressed={selected}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        aria-pressed={selected}
        className={classes}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
