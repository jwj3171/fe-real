"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "리뷰 많은순", value: "리뷰 많은순" },
  { label: "평점 높은순", value: "평점 높은순" },
  { label: "경력 높은순", value: "경력 높은순" }, // 필요시 서버에서 해석
  { label: "확정 많은순", value: "확정 많은순" },
] as const;
type SortLabel = (typeof SORT_OPTIONS)[number]["value"];

/** ref 를 HTMLElement | null 로 넓혀서 받도록 수정 */
function useOutsideClose(
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) onClose();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose, ref]);
}

export default function SortMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current: SortLabel =
    (sp.get("sort") as SortLabel) || ("평점 높은순" as SortLabel);

  const [open, setOpen] = React.useState(false);

  /** ✅ ref 생성 타입도 HTMLElement | null 로 통일 */
  const wrapRef = React.useRef<HTMLElement | null>(null);
  useOutsideClose(wrapRef, () => setOpen(false));

  const setSort = (value: SortLabel) => {
    const next = new URLSearchParams(sp.toString());
    next.set("sort", value);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={wrapRef as React.RefObject<HTMLDivElement>} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex h-10 items-center gap-2 rounded-full px-4",
          "border border-zinc-200 bg-white text-zinc-800",
          "shadow-sm transition-colors hover:bg-zinc-50",
          "cursor-pointer",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {current}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-36 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg"
        >
          {SORT_OPTIONS.map((opt) => {
            const active = opt.value === current;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSort(opt.value)}
                role="menuitem"
                className={[
                  "w-full rounded-lg px-3 py-2 text-left",
                  active
                    ? "bg-[#FFF1ED] font-semibold text-[#F9502E]"
                    : "hover:bg-zinc-50",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
