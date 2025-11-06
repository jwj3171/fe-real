"use client";

import SearchRow from "./SearchRow";
import FiltersRow from "./FiltersRow";
import SortMenu from "./SortMenu";

export default function SearchControls() {
  return (
    <div className="rounded-2xl bg-zinc-100/70 p-4">
      <SearchRow />

      <div className="mt-3 flex items-center justify-between gap-3">
        <FiltersRow />
        <SortMenu />
      </div>
    </div>
  );
}
