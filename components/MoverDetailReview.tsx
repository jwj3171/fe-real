"use client";

import Pagenation from "@/app/(mover)/movers/[moverId]/components/Pagenation";
import { fetchReviewsByMoverId } from "@/lib/api/review";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = { mover: any };

/* ------------------------- 공유 유틸 ------------------------- */

function formatDate(date: string | number | Date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // 안전장치
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul", // 또는 'UTC' (백엔드가 UTC면 UTC 권장)
  }).format(d);
}

export default function MoverDetailReview({ mover }: Props) {
  const [page, setPage] = useState(1);
  // ▼ 리뷰 API 대비: 실제 응답에 reviews 배열이 들어오면 자동 표시
  const { data } = useQuery({
    queryKey: ["reviews-mover", mover.id, page],
    queryFn: () => fetchReviewsByMoverId(mover.id, page),
  });

  const hasRealReviews = data?.total > 0;
  const totalPages = Math.ceil(data?.total / 5);

  return (
    <section className="relative flex flex-col items-center gap-12">
      <div className="mx-auto mt-12 max-w-[1120px]">
        <h3 className="mb-6 text-[18px] font-semibold text-zinc-900">리뷰</h3>

        {hasRealReviews ? (
          // 실제 리뷰가 있을 때 목록 렌더
          <section className="space-y-4">
            {data.reviews.map((r: any) => (
              <article
                key={r.id}
                className="rounded-xl border border-zinc-200 bg-white p-6"
              >
                <header className="mb-2 flex items-center justify-between">
                  <div className="font-semibold">{r.customer.name}</div>
                  <div className="text-sm text-zinc-500">
                    {formatDate(r.updatedAt)}
                  </div>
                </header>
                <div className="mb-2 text-[#FFB400]">
                  {"★".repeat(r.rating ?? 0)}
                  <span className="text-zinc-300">
                    {"★".repeat(Math.max(0, 5 - (r.rating ?? 0)))}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-zinc-700">{r.content}</p>
              </article>
            ))}
          </section>
        ) : (
          // 리뷰가 없을 때: 화면 중앙 안내
          <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <div className="text-[16px] font-semibold text-zinc-900">
              아직 등록된 리뷰가 없어요!
            </div>
            <div className="mt-2 text-sm text-zinc-500">
              가장 먼저 리뷰를 등록해보세요
            </div>
          </div>
        )}
      </div>
      <Pagenation page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
}
