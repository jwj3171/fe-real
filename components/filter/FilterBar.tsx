"use client";

import { useState } from "react";
import { MoveRequestFilter } from "@/lib/api/moveRequest";
import Image from "next/image";

interface FilterBarProps {
  filters: MoveRequestFilter;
  selectedLabels: {
    from: string;
    to: string;
    service: string;
    sort: string;
  };
  onFilterChange: (filters: MoveRequestFilter) => void;
  onLabelChange: (labels: {
    from: string;
    to: string;
    service: string;
    sort: string;
  }) => void;
}

export default function FilterBar({
  filters,
  selectedLabels,
  onFilterChange,
  onLabelChange,
}: FilterBarProps) {
  const [open, setOpen] = useState<"from" | "to" | "service" | "sort" | null>(
    null,
  );

  const REGIONS = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "대전",
    "대구",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];
  const services = ["전체", "소형이사", "가정이사", "사무실이사"];
  const sorts = [
    { label: "날짜 순", field: "moveDate", order: "asc" },
    { label: "마감일 순", field: "moveDate", order: "desc" },
    { label: "등록 최신 순", field: "createdAt", order: "desc" },
  ];

  const handleSelect = (
    key: keyof MoveRequestFilter,
    value: any,
    labelKey: keyof typeof selectedLabels,
    labelValue: string,
  ) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    onFilterChange(newFilters);
    onLabelChange({ ...selectedLabels, [labelKey]: labelValue });
    setOpen(null);
  };

  const getButtonClass = (selectedLabel: string, openKey: string) => {
    const isActive =
      selectedLabel !== "출발 지역" &&
      selectedLabel !== "도착 지역" &&
      selectedLabel !== "서비스" &&
      selectedLabel !== "정렬" &&
      selectedLabel !== "전체";

    const isOpen = open === openKey;

    return (
      // [수정] 모바일/태블릿에선 w-full, 큰 화면(lg)이상에서만 고정폭 w-32
      // [변경 이유] 작은 화면에선 그리드 셀을 꽉 채워 2×2 정렬, 큰 화면에선 버튼 가로폭 통일
      `flex w-full lg:w-32 items-center justify-between rounded-lg border px-4 py-2 text-sm font-semibold transition
      ${
        isActive || isOpen
          ? "border-red-400 bg-red-50 text-red-500"
          : "border-gray-300 text-gray-700 bg-white"
      }`
    );
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <Image
      src={isOpen ? "/icons/ic_chevron-up.svg" : "/icons/ic_chevron-down.svg"}
      alt="드롭다운"
      width={20}
      height={20}
    />
  );

  return (
    // [수정] 컨테이너 레이아웃을 반응형으로 전환
    // - 기본(작은 화면): grid 2열 → md에서 4열
    // - lg 이상: 좌측(3버튼 묶음) + 우측(정렬) 구조로 전환
    <div className="relative grid w-full grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-[auto_1fr] lg:items-center">
      {/* [수정] 왼쪽 묶음 래퍼
          - 기본: contents → 자식 버튼 3개가 그리드의 개별 셀로 배치(2×2 / 4열)
          - lg 이상: flex로 묶어서 한 박스처럼 보이게 */}
      <div className="contents lg:flex lg:gap-3">
        {/* 출발 지역 */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "from" ? null : "from")}
            className={getButtonClass(selectedLabels.from, "from")}
          >
            {selectedLabels.from}
            <ChevronIcon isOpen={open === "from"} />
          </button>
          {open === "from" && (
            // [수정] 드롭다운 너비: 기본(min-w-full) → lg에서만 고정폭 w-64
            <div className="absolute left-0 z-50 mt-2 min-w-full rounded-xl border border-gray-300 bg-white shadow-lg lg:w-64">
              <ul className="scrollbar-hide grid max-h-60 grid-cols-2 gap-1 overflow-y-auto p-2">
                {REGIONS.map((region) => (
                  <li
                    key={region}
                    onClick={() =>
                      handleSelect(
                        "departureRegions",
                        region === "전체" ? [] : [region],
                        "from",
                        region,
                      )
                    }
                    className={`cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      selectedLabels.from === region
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 도착 지역 */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "to" ? null : "to")}
            className={getButtonClass(selectedLabels.to, "to")}
          >
            {selectedLabels.to}
            <ChevronIcon isOpen={open === "to"} />
          </button>
          {open === "to" && (
            <div className="absolute left-0 z-50 mt-2 min-w-full rounded-xl border border-gray-300 bg-white shadow-lg lg:w-64">
              <ul className="scrollbar-hide grid max-h-60 grid-cols-2 gap-1 overflow-y-auto p-2">
                {REGIONS.map((region) => (
                  <li
                    key={region}
                    onClick={() =>
                      handleSelect(
                        "destinationRegions",
                        region === "전체" ? [] : [region],
                        "to",
                        region,
                      )
                    }
                    className={`cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      selectedLabels.to === region
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 서비스 */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "service" ? null : "service")}
            className={getButtonClass(selectedLabels.service, "service")}
          >
            {selectedLabels.service}
            <ChevronIcon isOpen={open === "service"} />
          </button>
          {open === "service" && (
            <div className="absolute left-0 z-50 mt-2 min-w-full rounded-xl border border-gray-300 bg-white shadow-lg lg:w-40">
              <ul>
                {services.map((service) => (
                  <li
                    key={service}
                    onClick={() =>
                      handleSelect(
                        "serviceTypes",
                        service === "전체"
                          ? []
                          : [
                              service === "소형이사"
                                ? "SMALL"
                                : service === "가정이사"
                                  ? "FAMILY"
                                  : "OFFICE",
                            ],
                        "service",
                        service,
                      )
                    }
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                      selectedLabels.service === service
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 정렬 */}
      <div className="relative lg:justify-self-end">
        <button
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          className={getButtonClass(selectedLabels.sort, "sort")}
        >
          {selectedLabels.sort}
          <ChevronIcon isOpen={open === "sort"} />
        </button>
        {open === "sort" && (
          // [수정] 작은 화면: 왼쪽 정렬(min-w-full) / 큰 화면: 우측 정렬(right-0) + 고정폭
          <div className="absolute left-0 z-50 mt-2 min-w-full rounded-xl border border-gray-300 bg-white shadow-lg lg:right-0 lg:left-auto lg:w-40">
            <ul>
              {sorts.map((sort) => (
                <li
                  key={sort.label}
                  onClick={() =>
                    handleSelect(
                      "sort",
                      { field: sort.field, order: sort.order },
                      "sort",
                      sort.label,
                    )
                  }
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    selectedLabels.sort === sort.label
                      ? "bg-red-50 text-red-500"
                      : ""
                  }`}
                >
                  {sort.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
