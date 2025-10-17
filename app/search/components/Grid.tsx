"use client";

import Link from "next/link";
import type { Mover } from "@/lib/api/mover";
import CardHeaderMover from "@/components/common/card/CardMover";

/** 문자열/숫자/null 안전 변환 */
function toNum(v: unknown, fallback = 0) {
  if (v == null) return fallback;
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const n = parseInt(v.replace(/[^\d.-]/g, ""), 10);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

/** API 응답 Mover -> CardHeaderMover 에 필요한 형태로 바로 매핑 */
function normalize(m: any) {
  const driverName = (m.nickname ?? m.name ?? "이사 기사님").trim();
  const description = (m.introduction ?? m.description ?? "").trim();
  const avatarUrl = (m.img ?? "/assets/profile_mover_detail.svg").trim();

  const rating = toNum(m.averageRating, 0);
  const reviewCount = toNum(
    m.totalReviews ?? (Array.isArray(m.reviews) ? m.reviews.length : undefined),
    0,
  );
  const careerYears = toNum(m.career, 0);
  const confirmedCount = Array.isArray(m.quotes) ? m.quotes.length : 0;

  const likeCount = toNum(
    m?._count?.likes ?? (Array.isArray(m.likes) ? m.likes.length : undefined),
    0,
  );

  return {
    driverName,
    description,
    avatarUrl,
    rating,
    reviewCount,
    careerYears,
    confirmedCount,
    likeCount,
  };
}

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
    <div className="mt-6">
      {items.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
          조건에 맞는 기사님을 찾지 못했어요.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((m) => {
            const n = normalize(m);
            const id = (m as any).id;

            return (
              <Link key={id} href={`/movers/${id}`} className="block">
                <CardHeaderMover {...n} className="" showPrice={false} />
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-zinc-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="h-9 min-w-9 rounded-md border border-zinc-200 bg-white px-3 disabled:opacity-50"
        >
          다음
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
