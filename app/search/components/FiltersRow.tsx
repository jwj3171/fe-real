"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// ▼ 지역/서비스 상수
const REGIONS_LEFT = ["전체", "경기", "강원", "충남", "대전"] as const;
const REGIONS_RIGHT = ["서울", "인천", "충북", "세종", "전북"] as const;
const ALL_REGIONS = [...REGIONS_LEFT, ...REGIONS_RIGHT];

const SERVICE_LABEL: Record<ServiceCode, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};
const SERVICE_FROM_LABEL: Record<string, ServiceCode> = {
  소형이사: "SMALL",
  가정이사: "FAMILY",
  사무실이사: "OFFICE",
};

type ServiceCode = "SMALL" | "FAMILY" | "OFFICE";

function useOutsideCloser<T extends HTMLElement>(onClose: () => void) {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return ref;
}

export default function FiltersRow() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const region = sp.get("region") ?? "전체";
  const serviceParam = (sp.get("service") as ServiceCode | null) ?? null;

  // 지역 드롭다운
  const [openRegion, setOpenRegion] = React.useState(false);
  const regRef = useOutsideCloser<HTMLDivElement>(() => setOpenRegion(false));

  // 서비스 드롭다운
  const [openService, setOpenService] = React.useState(false);
  const svcRef = useOutsideCloser<HTMLDivElement>(() => setOpenService(false));

  const apply = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === "" || v === "전체") next.delete(k);
      else next.set(k, v);
    });
    next.set("page", "1");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const reset = () => {
    const next = new URLSearchParams(sp.toString());
    ["q", "region", "service", "page"].forEach((k) => next.delete(k));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      {/* 지역 */}
      <div ref={regRef} className="relative">
        <button
          type="button"
          onClick={() => setOpenRegion((v) => !v)}
          className={[
            "flex h-9 items-center gap-2 rounded-[18px] border px-4",
            region !== "전체"
              ? "border-[#FF5A3D]/50 bg-[#FFF0EC]"
              : "border-zinc-200 bg-white",
          ].join(" ")}
        >
          {region === "전체" ? "지역" : region}
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M5 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </button>

        {openRegion && (
          <div className="absolute z-50 mt-2 flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow">
            {[REGIONS_LEFT, REGIONS_RIGHT].map((col, i) => (
              <div key={i} className="max-h-64 w-40 overflow-y-auto p-2">
                {col.map((label) => {
                  const active = region === label;
                  return (
                    <button
                      key={label}
                      onClick={() => {
                        setOpenRegion(false);
                        apply({ region: label === "전체" ? null : label });
                      }}
                      className={[
                        "block w-full rounded-md px-3 py-2 text-left text-sm",
                        active
                          ? "bg-zinc-50 font-semibold text-zinc-900"
                          : "text-zinc-700 hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 서비스 */}
      <div ref={svcRef} className="relative">
        <button
          type="button"
          onClick={() => setOpenService((v) => !v)}
          className={[
            "flex h-9 items-center gap-2 rounded-[18px] border px-4",
            serviceParam
              ? "border-[#FF5A3D]/50 bg-[#FFF0EC]"
              : "border-zinc-200 bg-white",
          ].join(" ")}
        >
          {serviceParam ? SERVICE_LABEL[serviceParam] : "서비스"}
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M5 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </button>

        {openService && (
          <div className="absolute z-50 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow">
            {["전체", "소형이사", "가정이사", "사무실이사"].map((label) => {
              const code =
                label === "전체"
                  ? null
                  : (SERVICE_FROM_LABEL[label] as ServiceCode);
              const active =
                (code && serviceParam === code) || (!code && !serviceParam);
              return (
                <button
                  key={label}
                  onClick={() => {
                    setOpenService(false);
                    apply({ service: code ?? null });
                  }}
                  className={[
                    "block w-full px-4 py-2 text-left text-sm",
                    active
                      ? "bg-zinc-50 font-semibold text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 초기화 */}
      <button
        type="button"
        onClick={reset}
        className="h-9 rounded-[18px] border border-zinc-200 bg-white px-4 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        초기화
      </button>
    </div>
  );
}
