"use client";

import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  getMoverReviewsByPage,
  type ReviewsPage,
  type Review,
} from "@/lib/moverApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import RatingStars from "@/components/common/rating/RatingStars";

/** 점수 리터럴 타입 + 순회 상수 */
type Score = 1 | 2 | 3 | 4 | 5;
const SCORES: readonly Score[] = [5, 4, 3, 2, 1] as const;

type Props = { moverId: string; initialPage?: number };

export default function Reviews({ moverId, initialPage = 1 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qc = useQueryClient();

  // URL ?page= (없으면 서버가 준 값)
  const page = Math.max(1, Number(sp.get("page") ?? initialPage));

  // 목록 조회
  const { data, isFetching } = useQuery<ReviewsPage>({
    queryKey: ["reviews-page", moverId, page],
    queryFn: () => getMoverReviewsByPage(moverId, page, 10),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });

  // 다음 페이지 프리패치
  useEffect(() => {
    const next = page + 1;
    qc.prefetchQuery({
      queryKey: ["reviews-page", moverId, next],
      queryFn: () => getMoverReviewsByPage(moverId, next, 10),
    });
  }, [page, moverId, qc]);

  // -------------------- 여기서부터는 항상 호출되는 훅들(안전 기본값 사용) --------------------
  const breakdownSafe = useMemo<Record<Score, number>>(
    () =>
      (data?.breakdown as Record<Score, number> | undefined) ?? {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    [data?.breakdown],
  );

  /** 분포 막대 기준값(최댓값) */
  const maxCount = useMemo(() => {
    const counts = SCORES.map((s) => breakdownSafe[s] ?? 0);
    const m = Math.max(...counts);
    return m > 0 ? m : 1; // 0 분모 방지
  }, [breakdownSafe]);

  /** 총 리뷰 수 (breakdown 합) */
  const totalReviewCount = useMemo(
    () => SCORES.reduce((sum, s) => sum + (breakdownSafe[s] ?? 0), 0),
    [breakdownSafe],
  );

  const avgSafe = data?.avg ?? 0;

  // 조기 반환(로딩/데이터 없음) — 위에서 훅들을 이미 호출했기 때문에 순서 문제 없음
  if (!data) {
    return (
      <div className="mb-6 grid grid-cols-[140px_1fr] gap-6">
        <div>
          <div className="text-3xl font-extrabold">{avgSafe.toFixed(1)}</div>
          <div className="mt-1 text-zinc-500">{totalReviewCount}개의 리뷰</div>
        </div>
        <div className="space-y-2">
          {SCORES.map((score) => {
            const count = breakdownSafe[score] ?? 0;
            const percent = Math.round((count / maxCount) * 100);
            return (
              <div
                key={score}
                className="flex h-[18px] items-center gap-2"
                aria-label={`${score}점 ${count}개`}
              >
                <span className="w-6 text-[12px] text-zinc-600">{score}점</span>
                <div className="relative h-[10px] w-[284px] rounded-full bg-zinc-100">
                  <div
                    className="absolute top-0 left-0 h-[10px] rounded-full bg-[#FFB400] transition-[width]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-9 text-right text-[12px] text-zinc-600">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
        <div className="col-span-2 text-center text-zinc-500">불러오는 중…</div>
      </div>
    );
  }
  // ----------------------------------------------------------------------------------------

  const { items, totalPages } = data;

  const goPage = (p: number) => {
    const params = new URLSearchParams(sp as any);
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {/* 평균 + 분포 */}
      <div className="mb-6 grid grid-cols-[140px_1fr] gap-6">
        <div>
          <div className="text-3xl font-extrabold">{avgSafe.toFixed(1)}</div>
          <div className="mt-1 text-zinc-500">{totalReviewCount}개의 리뷰</div>
        </div>

        <div className="space-y-2">
          {SCORES.map((score) => {
            const count = breakdownSafe[score] ?? 0;
            const percent = Math.round((count / maxCount) * 100); // 0~100
            return (
              <div
                key={score}
                className="flex h-[18px] items-center gap-2"
                aria-label={`${score}점 ${count}개`}
              >
                <span className="w-6 text-[12px] text-zinc-600">{score}점</span>
                <div className="relative h-[10px] w-[284px] rounded-full bg-zinc-100">
                  <div
                    className="absolute top-0 left-0 h-[10px] rounded-full bg-[#FFB400] transition-[width]"
                    style={{ width: `${percent}%` }}
                    aria-valuemin={0}
                    aria-valuemax={maxCount}
                    aria-valuenow={count}
                  />
                </div>
                <span className="w-9 text-right text-[12px] text-zinc-600">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <ul className="mt-4 flex flex-col gap-5">
        {items.map((r: Review) => (
          <li key={r.id} className="border-b border-zinc-200 pb-4">
            <div className="flex items-center gap-2">
              <RatingStars value={r.rating} size={8} />
              <span className="text-xs text-zinc-500">
                {r.nickname} ·{" "}
                {new Date(r.createdAt).toISOString().slice(0, 10)}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-zinc-800">
              {r.content}
            </p>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <nav
        className="mt-6 flex items-center justify-center gap-2"
        aria-label="리뷰 페이지네이션"
      >
        <button
          disabled={page <= 1}
          onClick={() => goPage(page - 1)}
          className="h-8 min-w-8 rounded-md border border-zinc-200 bg-white px-2 disabled:opacity-50"
        >
          ‹
        </button>

        {makeRange(page, totalPages).map((p) =>
          p === "…" ? (
            <span
              key={`ellipsis-${Math.random()}`}
              className="px-1 text-zinc-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goPage(p as number)}
              aria-current={p === page ? "page" : undefined}
              className={[
                "h-8 min-w-8 rounded-md border px-2",
                p === page
                  ? "border-primary-500 bg-primary-500 font-bold text-white"
                  : "border-zinc-200 bg-white",
              ].join(" ")}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page >= totalPages}
          onClick={() => goPage(page + 1)}
          className="h-8 min-w-8 rounded-md border border-zinc-200 bg-white px-2 disabled:opacity-50"
        >
          ›
        </button>
      </nav>

      {isFetching && (
        <div className="mt-2 text-center text-zinc-500">로딩 중…</div>
      )}
    </div>
  );
}

/** 페이지네이션 숫자 배열(1 … current±2 … total) */
function makeRange(current: number, total: number) {
  const s = new Set<number>();
  [
    1,
    2,
    total - 1,
    total,
    current - 2,
    current - 1,
    current,
    current + 1,
    current + 2,
  ].forEach((n) => {
    if (n >= 1 && n <= total) s.add(n);
  });
  const arr = Array.from(s).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("…");
  }
  return out;
}
