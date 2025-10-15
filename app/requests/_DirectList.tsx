"use client";

import { useRef } from "react";
import {
  useDirectRequests,
  useRejectDirectRequest,
} from "@/lib/queries/requests";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";
import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
import RejectRequestModal from "@/components/common/modal/RejectRequestModal";
import { Spinner } from "@/components/common/spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";

const svcMap = {
  SMALL: { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
} as const;

export default function DirectList() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useDirectRequests();
  const rejectMutation = useRejectDirectRequest();

  const estimateTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>(
    {},
  );
  const rejectTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>(
    {},
  );

  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="h-8 w-8 border-orange-500 border-t-transparent" />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">데이터 로드 실패</p>;

  const rows = data?.data ?? [];

  if (!rows.length)
    return <p className="text-center text-gray-400">요청이 없습니다.</p>;

  const invalidateDirectList = () =>
    qc.invalidateQueries({ queryKey: ["requests", "direct"], exact: false });

  const optimisticallyRemoveRow = (moveRequestId: number) => {
    const all = qc.getQueriesData<{ meta: any; data: any[] }>({
      queryKey: ["requests", "direct"],
    });
    for (const [key, snapshot] of all) {
      if (!snapshot) continue;
      qc.setQueryData(key, {
        ...snapshot,
        data: snapshot.data?.filter((r) => r.id !== moveRequestId) ?? [],
      });
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {rows.map((r) => {
          const chip = svcMap[r.serviceType];
          const isPending = r.direct_request_status === "PENDING";
          return (
            <div>
              <ReceivedRequestCard
                key={r.direct_request_id}
                customerName={"고객님"}
                from={r.departure}
                to={r.destination}
                movingDate={new Date(r.moveDate).toLocaleDateString("ko-KR")}
                requestTime={new Date(
                  r.direct_request_created_at,
                ).toLocaleString("ko-KR")}
                requestType={
                  r.direct_request_status === "PENDING"
                    ? "지정 요청 (대기)"
                    : r.direct_request_status === "ACCEPTED"
                      ? "지정 요청 (수락)"
                      : r.direct_request_status === "REJECTED"
                        ? "지정 요청 (반려)"
                        : "지정 요청 (만료)"
                }
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                onSendQuote={() => estimateTriggerRefs.current[r.id]?.click?.()}
                onReject={() => rejectTriggerRefs.current[r.id]?.click?.()}
                sendDisabled={!isPending || rejectMutation.isPending}
                rejectDisabled={!isPending || rejectMutation.isPending}
              />
              <SendEstimateModal
                trigger={
                  <button
                    ref={(el) => (estimateTriggerRefs.current[r.id] = el)}
                    className="hidden"
                  />
                }
                customerName={"고객님"}
                moveRequestId={r.id}
                departure={r.departure}
                destination={r.destination}
                moveDate={r.moveDate}
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                onSent={() => {
                  optimisticallyRemoveRow(r.id);
                  invalidateDirectList();
                }}
              />
              <RejectRequestModal
                trigger={
                  <button
                    ref={(el) => (rejectTriggerRefs.current[r.id] = el)}
                    className="hidden"
                  />
                }
                customerName={"고객님"}
                departure={r.departure}
                destination={r.destination}
                moveDate={r.moveDate}
                chips={[
                  { label: chip.label, iconSrc: chip.iconSrc, size: "sm" },
                  {
                    label: "지정 견적",
                    iconSrc: "/icons/ic_document.svg",
                    size: "sm",
                  },
                ]}
                pending={rejectMutation.isPending}
                onConfirm={async (comment) => {
                  await rejectMutation.mutateAsync({
                    directRequestId: r.direct_request_id,
                    comment,
                  });
                  invalidateDirectList();
                  alert("반려 처리되었습니다.");
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
