"use client";

import * as React from "react";
import Image from "next/image";
import { IconButton } from "./IconButton";
import type { IconButtonProps } from "./IconButton";

/** IconButton의 width/height와 동일하게 아이콘을 꽉 채우기 위한 px 매핑 */
const BOX_PX: Record<NonNullable<IconButtonProps["size"]>, number> = {
  sm: 32, // h-8 w-8
  md: 40, // h-10 w-10
  lg: 48, // h-12 w-12
};

/* ------------------------------------------------------------------ */
/* 링크 복사 : share-clip.svg (버튼 배경 X, 아이콘 그대로 출력)        */
/* ------------------------------------------------------------------ */
export interface LinkCopyButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  getText?: () => string; // 기본: location.href
  onCopied?: () => void;
  src?: string; // (옵션) 아이콘 경로 오버라이드
}

export function LinkCopyButton({
  size = "md",
  className,
  getText,
  onCopied,
  src = "/icons/share-clip.svg",
}: LinkCopyButtonProps) {
  async function handleCopy() {
    const text = getText
      ? getText()
      : typeof window !== "undefined"
      ? window.location.href
      : "";
    try {
      await navigator.clipboard.writeText(text);
      onCopied?.();
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      onCopied?.();
    }
  }

  const px = BOX_PX[size];

  return (
    <IconButton
      aria-label="링크 복사"
      size={size}
      variant="ghost" // ✅ 배경 없음
      color="neutral"
      onClick={handleCopy}
      className={["hover:bg-transparent focus-visible:ring-0", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image src={src} alt="링크 복사" width={px} height={px} />
    </IconButton>
  );
}

/* ------------------------------------------------------------------ */
/* 카카오 공유 : share-kakao.svg (버튼 배경 X, 아이콘 그대로 출력)     */
/* ------------------------------------------------------------------ */
export function KakaoShareButton({
  size = "md",
  className,
  ...props
}: Omit<IconButtonProps, "color" | "variant" | "children"> & {
  size?: "sm" | "md" | "lg";
}) {
  const px = BOX_PX[size];
  return (
    <IconButton
      aria-label="카카오로 공유"
      size={size}
      variant="ghost" // ✅ 배경 없음
      color="neutral"
      className={["hover:bg-transparent focus-visible:ring-0", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Image
        src="/icons/share-kakao.svg"
        alt="카카오로 공유"
        width={px}
        height={px}
      />
    </IconButton>
  );
}

/* ------------------------------------------------------------------ */
/* 페이스북 공유 : share-facebook.svg (버튼 배경 X, 아이콘 그대로)     */
/* ------------------------------------------------------------------ */
export function FacebookShareButton({
  size = "md",
  className,
  ...props
}: Omit<IconButtonProps, "color" | "variant" | "children"> & {
  size?: "sm" | "md" | "lg";
}) {
  const px = BOX_PX[size];
  return (
    <IconButton
      aria-label="페이스북으로 공유"
      size={size}
      variant="ghost" // ✅ 배경 없음
      color="neutral"
      className={["hover:bg-transparent focus-visible:ring-0", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Image
        src="/icons/share-facebook.svg"
        alt="페이스북으로 공유"
        width={px}
        height={px}
      />
    </IconButton>
  );
}

/* ------------------------------------------------------------------ */
/* 찜(하트) : 파일 기반 아이콘 (ic_like-default/active.svg)            */
/* ------------------------------------------------------------------ */
export interface LikeButtonProps
  extends Omit<IconButtonProps, "children" | "color" | "variant"> {
  filled?: boolean; // true = active, false = default
  size?: "sm" | "md" | "lg";
}

export function LikeButton({
  filled,
  size = "md",
  className,
  ...rest
}: LikeButtonProps) {
  const px = BOX_PX[size];
  const src = filled
    ? "/icons/ic_like-active.svg"
    : "/icons/ic_like-default.svg";

  return (
    <IconButton
      aria-label="찜하기"
      size={size}
      variant="ghost" // ✅ 배경 없음
      color="neutral"
      className={["hover:bg-transparent focus-visible:ring-0", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <Image
        src={src}
        alt={filled ? "찜 활성화" : "찜"}
        width={px}
        height={px}
      />
    </IconButton>
  );
}
