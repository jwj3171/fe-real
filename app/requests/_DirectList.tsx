"use client";

import { useDirectRequests } from "@/lib/queries/requests";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";
import { Spinner } from "@/components/common/spinner/Spinner";

const svcMap = {
  SMALL: { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
} as const;

export default function DirectList() {
  const { data, isLoading, isError } = useDirectRequests();

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

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {rows.map((r) => {
          const chip = svcMap[r.serviceType];
          return (
            <ReceivedRequestCard
              key={r.direct_request_id}
              customerName={"고객님"}
              from={r.departure}
              to={r.destination}
              movingDate={new Date(r.moveDate).toLocaleDateString("ko-KR")}
              requestTime={new Date(r.direct_request_created_at).toLocaleString(
                "ko-KR",
              )}
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
            />
          );
        })}
      </div>
    </section>
  );
}
