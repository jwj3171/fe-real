"use client";

import * as React from "react";

export interface RatingStarsProps {
  /** 0~5, 기본 0 */
  value?: number;
  onChange?: (next: number) => void;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 아이콘 픽셀 크기 */
  size?: number;
  gap?: number;
  className?: string;
}

const STAR_COUNT = 5;

export default function RatingStars({
  value = 0,
  onChange,
  readOnly = false,
  size = 28,
  className,
}: RatingStarsProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const display = hover ?? value;

  const inc = () => onChange?.(Math.min(STAR_COUNT, (value || 0) + 1));
  const dec = () => onChange?.(Math.max(1, (value || 1) - 1));

  return (
    <div
      className={`flex items-center gap-3 ${className ?? ""}`}
      role="radiogroup"
      aria-label="평점 선택"
      onKeyDown={(e) => {
        if (readOnly) return;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          inc();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          dec();
        }
      }}
    >
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const index = i + 1;
        const active = display >= index;
        const src = active
          ? "/icons/ic_star-active.svg"
          : "/icons/ic_star-default.svg";

        return (
          <button
            key={index}
            type="button"
            role="radio"
            aria-checked={value === index}
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(index)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onFocus={() => !readOnly && setHover(index)}
            onBlur={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(index)}
            className="p-0 bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5A3D] rounded"
          >
            {/* SVG는 next/image 대신 <img>가 가장 안전 */}
            <img
              src={src}
              alt={`${index}점`}
              width={size}
              height={size}
              style={{ width: size, height: size }}
            />
          </button>
        );
      })}
    </div>
  );
}
