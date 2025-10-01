"use client";

import type { Mover } from "../../../lib/MoverSearchApi";
import MoverCard from "./MoverCard";

export default function Grid({
  items,
  page,
  totalPages,
  isFetching,
  onPrev,
  onNext,
}: {
  items: Mover[];
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500">
          검색 결과가 없어요.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((m) => (
            <MoverCard key={m.id} mover={m} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          ‹
        </button>
        <span className="text-sm text-zinc-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          ›
        </button>
      </div>

      {isFetching && (
        <div className="mt-2 text-center text-sm text-zinc-500">
          불러오는 중…
        </div>
      )}
    </div>
  );
}
