"use client";

import * as React from "react";
import { cn } from "./cn";
import type { IconVariant, IconSize, IconColor } from "./types";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: IconVariant; // "solid" | "outline" | "ghost"
  size?: IconSize; // "sm" | "md" | "lg"
  color?: IconColor; // "primary" | "white" | "kakao" | "facebook" | "neutral"
  rounded?: "lg" | "xl" | "full";
  selected?: boolean; // outline일 때 활성표현에 사용
}

const sizeMap: Record<IconSize, string> = {
  sm: "h-8  w-8  text-[16px]",
  md: "h-10 w-10 text-[18px]",
  lg: "h-12 w-12 text-[20px]",
};

const baseFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D]";

function tone(variant: IconVariant, color: IconColor, selected?: boolean) {
  if (variant === "solid") {
    if (color === "primary")
      return "text-white bg-gradient-to-r from-[#FF5A3D] to-[#FF3D2E] hover:brightness-95 disabled:opacity-50";
    if (color === "kakao")
      return "bg-[#FEE500] text-black hover:brightness-95 disabled:opacity-50";
    if (color === "facebook")
      return "bg-[#1877F2] text-white hover:brightness-95 disabled:opacity-50";
    if (color === "white")
      return "bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50";
    return "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50";
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
  // ghost
  if (color === "primary") return "text-[#FF5A3D] hover:bg-[#FFF1ED]";
  return "text-gray-700 hover:bg-gray-50";
}

export const IconButtons = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      color = "primary",
      rounded = "xl",
      selected,
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

    return <button ref={ref} className={classes} {...rest} />;
  }
);
IconButtons.displayName = "IconButton";
