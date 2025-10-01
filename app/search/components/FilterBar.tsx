"use client";

import { useMoverSearchStore } from "@/store/moverSearchStore";
import { Chip } from "@/components/common/chip/Chips";

const REGIONS = [
  "전체",
  "서울",
  "경기",
  "인천",
  "대전",
  "충남",
  "전북",
] as const;
const SERVICES = ["전체", "소형이사", "가정이사", "사무실이사"] as const;

export default function FilterBar() {
  const { q, region, service, sort, setQ, setRegion, setService, setSort } =
    useMoverSearchStore();

  return (
    <div className="mb-4 flex flex-col gap-3">
      <input
        className="h-11 w-full rounded-lg border border-zinc-200 px-3"
        placeholder="텍스트를 입력해 주세요."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-2">
        {REGIONS.map((r) => {
          const v = r === "전체" ? null : r;
          const selected = region === v;
          return (
            <Chip
              key={r}
              variant="outline"
              color="neutral"
              size="lg"
              selected={selected}
              onClick={() => setRegion(v)}
            >
              {r}
            </Chip>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SERVICES.map((s) => {
          const v = s === "전체" ? null : s;
          const selected = service === v;
          return (
            <Chip
              key={s}
              variant="outline"
              color="primary"
              size="lg"
              selected={selected}
              onClick={() => setService(v)}
            >
              {s}
            </Chip>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <select
          className="h-10 rounded-md border border-zinc-200 px-2"
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="recent">최신 순</option>
          <option value="ratingDesc">평점 높은 순</option>
          <option value="movesDesc">확정 많은 순</option>
        </select>
      </div>
    </div>
  );
}
