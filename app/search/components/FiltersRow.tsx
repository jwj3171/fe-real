"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import FilterBar from "@/components/filter/FilterBar";
import type { MoveRequestFilter } from "@/lib/api/moveRequest";

// URL ↔ labels 변환 유틸
const DEFAULT_LABELS = {
  from: "출발 지역",
  to: "도착 지역",
  service: "서비스",
  sort: "정렬",
} as const;

function serviceLabelToEnum(label: string | undefined) {
  if (!label || label === "전체") return [];
  if (label === "소형이사") return ["SMALL"];
  if (label === "가정이사") return ["FAMILY"];
  if (label === "사무실이사") return ["OFFICE"];
  return [];
}

// FilterBar 내부 sort 옵션(라벨↔객체) 매핑
function sortLabelToObj(label: string | undefined) {
  // FilterBar.tsx 기준:
  //  - "날짜 순"      { field: "moveDate",  order: "asc"  }
  //  - "마감일 순"    { field: "moveDate",  order: "desc" }
  //  - "등록 최신 순" { field: "createdAt", order: "desc" }
  switch (label) {
    case "날짜 순":
      return { field: "moveDate", order: "asc" as const };
    case "마감일 순":
      return { field: "moveDate", order: "desc" as const };
    case "등록 최신 순":
      return { field: "createdAt", order: "desc" as const };
    default:
      return { field: "createdAt", order: "desc" as const };
  }
}

function sortObjToLabel(sort?: { field?: string; order?: string }) {
  if (!sort) return DEFAULT_LABELS.sort;
  if (sort.field === "moveDate" && sort.order === "asc") return "날짜 순";
  if (sort.field === "moveDate" && sort.order === "desc") return "마감일 순";
  if (sort.field === "createdAt" && sort.order === "desc")
    return "등록 최신 순";
  return DEFAULT_LABELS.sort;
}

export default function FiltersRow() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // 1) URL → labels/filters 초기값 구성
  const urlFrom = sp.get("from") ?? undefined;
  const urlTo = sp.get("to") ?? undefined;
  const urlService = sp.get("service") ?? undefined; // "소형이사|가정이사|사무실이사|전체"
  const urlSort = sp.get("sort") ?? undefined; // "날짜 순|마감일 순|등록 최신 순"

  const selectedLabels = {
    from: urlFrom || DEFAULT_LABELS.from,
    to: urlTo || DEFAULT_LABELS.to,
    service: urlService || DEFAULT_LABELS.service,
    sort: urlSort || DEFAULT_LABELS.sort,
  };

  const filters: MoveRequestFilter = {
    departureRegions: urlFrom && urlFrom !== "전체" ? [urlFrom] : [],
    destinationRegions: urlTo && urlTo !== "전체" ? [urlTo] : [],
    serviceTypes: serviceLabelToEnum(urlService),
    sort: sortLabelToObj(urlSort),
    page: Number(sp.get("page") ?? 1) || 1,
  };

  // 2) 콜백: FilterBar → URL 동기화
  const onFilterChange = (next: MoveRequestFilter) => {
    const nextSp = new URLSearchParams(sp.toString());

    // 출발/도착 지역
    const nextFrom = (next.departureRegions?.[0] as string) ?? "전체";
    const nextTo = (next.destinationRegions?.[0] as string) ?? "전체";
    nextFrom && nextFrom !== "전체"
      ? nextSp.set("from", nextFrom)
      : nextSp.delete("from");
    nextTo && nextTo !== "전체"
      ? nextSp.set("to", nextTo)
      : nextSp.delete("to");

    // 서비스
    const labelService =
      (next.serviceTypes?.[0] === "SMALL" && "소형이사") ||
      (next.serviceTypes?.[0] === "FAMILY" && "가정이사") ||
      (next.serviceTypes?.[0] === "OFFICE" && "사무실이사") ||
      "전체";
    labelService !== "전체"
      ? nextSp.set("service", labelService)
      : nextSp.delete("service");

    // 정렬
    const sortLabel = sortObjToLabel(next.sort || undefined);
    sortLabel !== DEFAULT_LABELS.sort
      ? nextSp.set("sort", sortLabel)
      : nextSp.delete("sort");

    nextSp.set("page", "1"); // 필터 변경 시 1페이지로
    router.replace(`${pathname}?${nextSp.toString()}`, { scroll: false });
  };

  const onLabelChange = (labels: {
    from: string;
    to: string;
    service: string;
    sort: string;
  }) => {
    const nextSp = new URLSearchParams(sp.toString());

    labels.from && labels.from !== "전체"
      ? nextSp.set("from", labels.from)
      : nextSp.delete("from");
    labels.to && labels.to !== "전체"
      ? nextSp.set("to", labels.to)
      : nextSp.delete("to");
    labels.service && labels.service !== "전체"
      ? nextSp.set("service", labels.service)
      : nextSp.delete("service");
    labels.sort && labels.sort !== DEFAULT_LABELS.sort
      ? nextSp.set("sort", labels.sort)
      : nextSp.delete("sort");

    nextSp.set("page", "1");
    router.replace(`${pathname}?${nextSp.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <FilterBar
        filters={filters}
        selectedLabels={selectedLabels}
        onFilterChange={onFilterChange}
        onLabelChange={onLabelChange}
      />
    </div>
  );
}
