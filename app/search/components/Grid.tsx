"use client";

import type { Mover } from "@/lib/api/mover";
import CardHeaderMover from "@/components/common/card/CardMover";

type Props = {
  items: Mover[];
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function Grid({
  items,
  page,
  totalPages,
  isFetching,
  onPrev,
  onNext,
}: Props) {
  // 백엔드/목 데이터의 키 차이를 흡수해서 카드가 항상 안전하게 렌더되도록 정규화
  const normalize = (m: Mover) => {
    const driverName =
      (m as any).nickname ||
      (m as any).name ||
      (m as any).driverName ||
      "무빙 기사님";

    const description =
      (m as any).introduction ||
      (m as any).intro ||
      (m as any).description ||
      "";

    const avatarUrl =
      (m as any).avatarUrl ||
      (m as any).avatarURL ||
      (m as any).avatar ||
      undefined;

    const rating = Number((m as any).averageRating ?? (m as any).rating ?? 0);

    const reviewCount = Number(
      (m as any)._count?.reviews ??
        (m as any).reviewsCount ??
        (m as any).reviewCount ??
        0,
    );

    const confirmedCount = Number(
      (m as any)._count?.quotes ??
        (m as any).confirmedCount ??
        (m as any).quoteCount ??
        0,
    );

    const careerYears = Number(
      (m as any).career ?? (m as any).careerYears ?? 0,
    );

    return {
      driverName,
      description,
      avatarUrl,
      rating,
      reviewCount,
      confirmedCount,
      careerYears,
    };
  };

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
            return (
              <CardHeaderMover
                key={(m as any).id ?? `${n.driverName}-${n.confirmedCount}`}
                driverName={n.driverName}
                description={n.description}
                avatarUrl={n.avatarUrl}
                rating={n.rating}
                reviewCount={n.reviewCount}
                careerYears={n.careerYears}
                confirmedCount={n.confirmedCount}
                className="w-full"
                showPrice={false}
              />
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
