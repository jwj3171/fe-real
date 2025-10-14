"use client";
import { useMemo } from "react";
import { useMoverQuoteTabStore } from "@/store/moverQuoteTabStore";
import {
  useNormalRequests,
  useDirectRequests,
} from "@/lib/queries/moverRequests";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";

export default function MyQuotePage() {
  const { tab } = useMoverQuoteTabStore();
  return tab === "normal" ? <NormalList /> : <DirectList />;
}

function svcChip(serviceType: "SMALL" | "FAMILY" | "OFFICE") {
  return {
    label:
      serviceType === "SMALL"
        ? "소형이사"
        : serviceType === "FAMILY"
          ? "가정이사"
          : "사무실이사",
    iconSrc:
      serviceType === "SMALL"
        ? "/icons/ic_box.svg"
        : serviceType === "FAMILY"
          ? "/icons/ic_home.svg"
          : "/icons/ic_company.svg",
  };
}

function NormalList() {
  const q = useNormalRequests();

  if (q.isPending) return <div>로딩…</div>;
  if (q.error)
    return <div className="text-red-600">에러: {(q.error as any).message}</div>;

  const list = q.data?.pages?.flatMap((p) => p.data) ?? [];

  return (
    <div className="grid gap-3">
      {list.map((req) => (
        <ReceivedRequestCard
          key={req.id}
          customerName={`고객 #${req.customerId}`}
          from={req.departure}
          to={req.destination}
          movingDate={new Date(req.moveDate).toLocaleDateString("ko-KR")}
          requestTime={new Date(req.createdAt).toLocaleString("ko-KR")}
          requestType={req.myQuote ? "내가 제출한 견적 있음" : "일반 요청"}
          chips={[svcChip(req.serviceType)]}
          onSendQuote={() => {
            alert(`(예시) 일반 요청 견적보내기: moveRequestId=${req.id}`);
          }}
        />
      ))}
      {!list.length && (
        <div className="text-gray-500">일반 요청이 없습니다.</div>
      )}

      {q.hasNextPage && (
        <button
          className="mt-4 rounded border px-3 py-2"
          onClick={() => q.fetchNextPage()}
          disabled={q.isFetchingNextPage}
        >
          {q.isFetchingNextPage ? "더 불러오는 중…" : "더 보기"}
        </button>
      )}
    </div>
  );
}

function DirectList() {
  const q = useDirectRequests();

  if (q.isPending) return <div>로딩…</div>;
  if (q.error)
    return <div className="text-red-600">에러: {(q.error as any).message}</div>;

  const list = q.data?.data ?? [];

  return (
    <div className="grid gap-3">
      {list.map((row) => (
        <ReceivedRequestCard
          key={row.direct_request_id}
          customerName={row.customer_email ?? `고객 #${row.customerId}`}
          from={row.departure}
          to={row.destination}
          movingDate={new Date(row.moveDate).toLocaleDateString("ko-KR")}
          requestTime={new Date(row.direct_request_created_at).toLocaleString(
            "ko-KR",
          )}
          requestType={`지정 요청 (${row.direct_request_status})`}
          chips={[svcChip(row.serviceType)]}
          onReject={() => {
            alert(`(예시) 반려하기 id=${row.direct_request_id}`);
          }}
          onSendQuote={() => {
            alert(`(예시) 지정 요청 견적보내기: moveRequestId=${row.id}`);
          }}
        />
      ))}
      {!list.length && (
        <div className="text-gray-500">지정 요청이 없습니다.</div>
      )}
    </div>
  );
}
