"use client";
import { useQuotesByRequest } from "@/lib/queries/quotes";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";
import type { QuoteWithMover } from "@/types/move";

const toYears = (s?: string) => {
  if (!s) return 0;
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : 0;
};

export default function QuotesClient({ requestId }: { requestId: number }) {
  const { data, isPending, error } = useQuotesByRequest(requestId);

  if (isPending) return <div className="p-6">견적 로딩…</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">에러: {(error as any).message}</div>
    );

  return (
    <div className="space-y-3 p-6">
      <h1 className="text-lg font-semibold">이사 요청 #{requestId}의 견적</h1>
      {(data ?? []).map((q) => (
        <QuoteCard key={q.id} q={q} />
      ))}
      {!data?.length && (
        <div className="text-gray-500">아직 등록된 견적이 없습니다.</div>
      )}
    </div>
  );
}

function QuoteCard({ q }: { q: QuoteWithMover }) {
  const m = q.mover;

  return (
    <WaitingRequestCard
      // 기사 정보 (백엔드 조인 결과 사용)
      driverName={m.nickname}
      description={q.comment ?? ""}
      avatarUrl={m.img}
      rating={m.averageRating ?? 0}
      reviewCount={m.totalReviews ?? 0}
      careerYears={toYears(m.career)}
      confirmedCount={0}
      likeCount={m._count?.likes ?? 0}
      price={q.price}
      comment={q.comment ?? ""}
      moveType="-"
      requestType={q.type}
      className="w-full"
    />
  );
}
