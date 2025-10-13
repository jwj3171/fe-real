"use client";
import MyRequestCard from "@/components/common/card/MyRequestCard";
import { useMyActive, useMyClosed } from "@/lib/queries/myRequests";
import { useEstimatesTabStore } from "@/store/estimatesTabStore";
import { useMemo } from "react";

export default function MyEstimatesPage() {
  const { tab } = useEstimatesTabStore();
  const { data: active, isPending: p1, error: e1 } = useMyActive();
  const { data: closedRaw, isPending: p2, error: e2 } = useMyClosed();

  const confirmed = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "COMPLETED"),
    [closedRaw],
  );
  const expired = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "FINISHED"),
    [closedRaw],
  );

  const list =
    tab === "active" ? active : tab === "confirmed" ? confirmed : expired;
  const pending = tab === "active" ? p1 : p2;
  const error = tab === "active" ? e1 : e2;

  return (
    <div className="space-y-4 p-6">
      {pending && <div>로딩…</div>}
      {error && (
        <div className="text-red-600">에러: {(error as any).message}</div>
      )}

      {!pending && !error && (
        <div className="grid gap-3">
          {list?.map((req) => (
            <MyRequestCard key={req.id} req={req} />
          ))}
          {!list?.length && (
            <div className="text-gray-500">
              {tab === "active" && "대기 중인 이사 요청이 없습니다."}
              {tab === "confirmed" && "확정된 이사 요청이 없습니다."}
              {tab === "expired" && "기한이 지나 종료된 요청이 없습니다."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
