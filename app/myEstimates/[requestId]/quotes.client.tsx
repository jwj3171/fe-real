"use client";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuotesByRequest } from "@/lib/queries/quotes";
import { MY_REQUESTS_KEYS } from "@/lib/queries/myRequests";
import type { QuoteWithMover } from "@/types/move";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";
import EstimateHistoryCard from "@/components/common/card/EstimateHistoryCard";
import { acceptQuote } from "@/lib/quoteApi";
import { useEstimatesTabStore } from "@/store/estimatesTabStore";

const toYears = (s?: string) => {
  if (!s) return 0;
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : 0;
};

export default function QuotesClient({ requestId }: { requestId: number }) {
  const router = useRouter();
  const qc = useQueryClient();
  const setTab = useEstimatesTabStore((s) => s.setTab);

  const { data, isPending, error } = useQuotesByRequest(requestId);

  const { mutate: confirm, isPending: confirming } = useMutation({
    mutationFn: (quoteId: number) => acceptQuote(quoteId),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["quotes", "byRequest", requestId] }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.active() }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.closed() }),
      ]);
      setTab("confirmed");
      router.replace("/myEstimates?tab=confirmed");
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message ?? "견적 확정 중 오류가 발생했습니다.");
    },
  });
  if (isPending) return <div className="p-6">견적 로딩…</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">에러: {(error as any).message}</div>
    );

  const items = data ?? [];
  const hasAccepted = items.some((q) => q.status === "ACCEPTED");

  return (
    <div className="space-y-3 p-6">
      <h1 className="text-lg font-semibold">이사 요청 #{requestId}의 견적</h1>
      {hasAccepted
        ? items.map((q) => <HistoryCard key={q.id} q={q} />)
        : items.map((q) => (
            <QuoteCard
              key={q.id}
              q={q}
              onConfirm={() => confirm(q.id)}
              confirming={confirming}
            />
          ))}
      {!items?.length && (
        <div className="text-gray-500">아직 등록된 견적이 없습니다.</div>
      )}
    </div>
  );
}

function QuoteCard({
  q,
  onConfirm,
  confirming,
}: {
  q: QuoteWithMover;
  onConfirm: () => void;
  confirming: boolean;
}) {
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
      onConfirm={onConfirm}
      confirmDisabled={q.status !== "PENDING"}
      confirmLoading={confirming}
    />
  );
}

function HistoryCard({ q }: { q: QuoteWithMover }) {
  const m = q.mover;
  return (
    <EstimateHistoryCard
      message={q.comment ?? ""}
      driverName={m.nickname}
      avatarUrl={m.img}
      rating={m.averageRating ?? 0}
      reviewCount={m.totalReviews ?? 0}
      careerYears={toYears(m.career)}
      confirmedCount={0}
      liked={m._count?.likes ?? 0}
      price={q.price}
      status={q.status === "ACCEPTED" ? "confirmed" : "waiting"}
      className="w-full"
    />
  );
}
