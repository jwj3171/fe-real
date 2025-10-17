"use client";

import SearchRow from "./SearchRow";
import FiltersRow from "./FiltersRow";
import SortMenu from "./SortMenu";

export default function SearchControls() {
  return (
    <div className="rounded-2xl bg-zinc-100/70 p-4">
      <SearchRow />

      {/* 아래 줄: 좌측(필터/초기화), 우측(정렬) */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <FiltersRow />
        <SortMenu />
      </div>
    </div>
  );
}
