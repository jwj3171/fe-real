"use client";

import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import RatingStars from "@/components/common/rating/RatingStars";
import type { Review, ReviewsPage } from "@/lib/moverApi";
import { getMoverReviewsByPage } from "@/lib/moverApi";

/** 점수 리터럴 타입 + 순회 상수 */
type Score = 1 | 2 | 3 | 4 | 5;
const SCORES: readonly Score[] = [5, 4, 3, 2, 1] as const;

/** 날짜 포맷: CSR에서만 포맷, SSR/CSR mismatch 방지 */
const dateFmt = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const toDateSafe = (v: string | number | Date) => {
  try {
    return new Date(v);
  } catch {
    return new Date();
  }
};

type Props = { moverId: string; initialPage?: number };

/** breakdown/avg/총합/히스토그램 최댓값 계산 */
function buildStats(data?: ReviewsPage) {
  // 1) 서버가 내려준 값이 있으면 우선 사용
  let breakdown: Record<Score, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let avg = 0;

  if (data?.breakdown) {
    // 키가 string일 수도 있어서 보정
    breakdown = {
      1: Number((data.breakdown as any)[1] ?? 0),
      2: Number((data.breakdown as any)[2] ?? 0),
      3: Number((data.breakdown as any)[3] ?? 0),
      4: Number((data.breakdown as any)[4] ?? 0),
      5: Number((data.breakdown as any)[5] ?? 0),
    };
  } else if (data?.items?.length) {
    // 2) 없으면 클라에서 계산
    for (const r of data.items) {
      const s = Math.round(Number(r.rating)) as Score;
      if (breakdown[s] !== undefined) breakdown[s] += 1;
    }
  }

  const totalCount = SCORES.reduce((s, k) => s + (breakdown[k] ?? 0), 0);
  if (data?.avg != null) {
    avg = Number(data.avg);
  } else if (totalCount > 0) {
    const sum = SCORES.reduce((s, k) => s + k * (breakdown[k] ?? 0), 0);
    avg = Number((sum / totalCount).toFixed(1));
  } else {
    avg = 0;
  }

  const maxForBar = Math.max(
    1,
    ...SCORES.map((k) => Number(breakdown[k] ?? 0)),
  );

  return { breakdown, totalCount, avg, maxForBar };
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

export default function Reviews({ moverId, initialPage = 1 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qc = useQueryClient();

  const page = Math.max(1, Number(sp.get("page") ?? initialPage));

  // 목록 조회
  const { data, isFetching } = useQuery<ReviewsPage>({
    queryKey: ["reviews-page", moverId, page],
    queryFn: () => getMoverReviewsByPage(moverId, page, 10),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });

  // 다음 페이지 프리패치 (범위 체크)
  React.useEffect(() => {
    if (!data?.totalPages) return;
    const next = page + 1;
    if (next <= data.totalPages) {
      qc.prefetchQuery({
        queryKey: ["reviews-page", moverId, next],
        queryFn: () => getMoverReviewsByPage(moverId, next, 10),
      });
    }
  }, [page, moverId, qc, data?.totalPages]);

  /** 안전 통계 */
  const { breakdown, totalCount, avg, maxForBar } = React.useMemo(
    () => buildStats(data),
    [data],
  );

  const goPage = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 로딩/프리패치 상태일 때도 통계 틀은 유지
  if (!data) {
    return (
      <div className="mb-6 grid grid-cols-[140px_1fr] gap-6">
        <div>
          <div className="text-3xl font-extrabold">{avg.toFixed(1)}</div>
          <div className="mt-1 text-zinc-500">{totalCount}개의 리뷰</div>
        </div>
        <div className="space-y-2">
          {SCORES.map((score) => {
            const count = breakdown[score] ?? 0;
            const percent = Math.round((count / maxForBar) * 100);
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

  const { items, totalPages } = data;

  return (
    <div>
      {/* 평균 + 히스토그램 */}
      <div className="mb-6 grid grid-cols-[140px_1fr] gap-6">
        <div>
          <div className="text-3xl font-extrabold">{avg.toFixed(1)}</div>
          <div className="mt-1 text-zinc-500">{totalCount}개의 리뷰</div>
        </div>

        <div className="space-y-2">
          {SCORES.map((score) => {
            const count = breakdown[score] ?? 0;
            const percent = Math.round((count / maxForBar) * 100); // 0~100
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
                    aria-valuemax={maxForBar}
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
          <li
            key={r.id}
            className="rounded-xl border border-zinc-200 bg-white p-6"
          >
            <header className="mb-2 flex items-center justify-between">
              {/* 닉네임 */}
              <div className="font-semibold text-zinc-800">
                {r.nickname ?? "익명"}
              </div>
              {/* 날짜: hydration-safe */}
              <div className="text-sm text-zinc-500">
                {dateFmt.format(toDateSafe(r.createdAt))}
              </div>
            </header>

            <div className="mb-1">
              {/* 너희 컴포넌트는 value prop 씀 */}
              <RatingStars value={r.rating} />
            </div>

            <p className="leading-relaxed whitespace-pre-wrap text-zinc-800">
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

        {makeRange(page, totalPages ?? 1).map((p) =>
          p === "…" ? (
            <span
              key={`ellipsis-${page}-${Math.random()}`}
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
          disabled={!!totalPages && page >= (totalPages as number)}
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
