"use client";

import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoveRequests, MoveRequestFilter } from "@/lib/api/moveRequest";
import { moveRequestsKey } from "@/lib/queries/requestKeys";
import FilterBar from "@/components/filter/FilterBar";
import MoverRequest from "@/components/common/card/MoverRequestCard";
import SendEstimateModal from "@/components/common/modal/SendEstimateModal";
import { Spinner } from "@/components/common/spinner/Spinner";
import { formatDateSeoul } from "@/utils/formatDateSeoul";
import { Buttons } from "@/components/common/button";
import { PendingButton } from "@/components/common/button/Buttons";

export default function NormalList({
  initialFilters,
}: {
  initialFilters: MoveRequestFilter;
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedLabels, setSelectedLabels] = useState({
    from: "출발 지역",
    to: "도착 지역",
    service: "서비스",
    sort: "정렬",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: moveRequestsKey(filters.page ?? 1, filters.pageSize ?? 5),
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...filters, page: pageParam }),
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30_000,
  });

  useEffect(() => {}, [filters]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
    });
    if (observerRef.current) ob.observe(observerRef.current);
    return () => ob.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const requests = data?.pages.flatMap((p) => p.data) ?? [];

  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="h-8 w-8 border-orange-500 border-t-transparent" />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">데이터 로드 실패</p>;

  return (
    // 컨테이너: 가운데 정렬 + 모바일 좌우 패딩, 데스크탑은 0
    <section className="container mx-auto max-w-[1100px] space-y-6 px-4 sm:px-6 lg:px-0">
      <div className="mb-2">
        <FilterBar
          filters={filters}
          selectedLabels={selectedLabels}
          onFilterChange={setFilters}
          onLabelChange={setSelectedLabels}
        />
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-gray-400">요청이 없습니다.</p>
      ) : (
        requests.map((req) => (
          // 래퍼 하나로 MoverRequestCard의 최상위 div에 반응형 스타일을 “주입”
          // - max-md에서 flex-col/갭/패딩 축소
          // - 오른쪽 액션 영역(마지막 div)을 아래로 내려가도 오른쪽 정렬 유지
          <div
            key={req.id}
            className="max-md:[&>div]:flex-col max-md:[&>div]:items-stretch max-md:[&>div]:gap-3 max-md:[&>div]:p-4 max-md:[&>div>div:last-child]:self-end"
          >
            <MoverRequest
              customerName={req.customerName || "고객님"}
              description="빠르고 안전한 이사를 원해요"
              from={req.departure}
              to={req.destination}
              movingDate={formatDateSeoul(req.moveDate)}
              chips={[
                {
                  label:
                    req.serviceType === "SMALL"
                      ? "소형이사"
                      : req.serviceType === "FAMILY"
                        ? "가정이사"
                        : "사무실이사",
                  iconSrc: "/icons/ic_moving.svg",
                },
              ]}
              action={
                req.moveRequest ? (
                  req.moveRequest.status === "PENDING" ? (
                    // 모바일 100% 폭, md부터 자동폭
                    <PendingButton className="w-full md:w-auto">
                      고객 확인 중
                    </PendingButton>
                  ) : req.moveRequest.status === "REJECTED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-green-400 bg-green-50 px-4 py-2 font-semibold text-green-600 md:w-auto"
                    >
                      다른 기사 선택됨
                    </Buttons>
                  ) : req.moveRequest.status === "ACCEPTED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-green-400 bg-green-50 px-4 py-2 font-semibold text-green-600 md:w-auto"
                    >
                      채택됨 🎉
                    </Buttons>
                  ) : req.moveRequest.status === "EXPIRED" ? (
                    <Buttons
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-gray-400 bg-gray-100 px-4 py-2 font-semibold text-gray-600 md:w-auto"
                    >
                      만료됨
                    </Buttons>
                  ) : null
                ) : (
                  <SendEstimateModal
                    trigger={
                      <Buttons
                        variant="solid"
                        color="primary"
                        size="lg"
                        flat
                        className="w-full md:w-auto"
                      >
                        견적 보내기
                      </Buttons>
                    }
                    customerName={req.customerName || "고객님"}
                    moveRequestId={req.id}
                    departure={req.departure}
                    destination={req.destination}
                    moveDate={req.moveDate}
                    quoteType="NORMAL"
                    chips={[
                      {
                        label:
                          req.serviceType === "SMALL"
                            ? "소형이사"
                            : req.serviceType === "FAMILY"
                              ? "가정이사"
                              : "사무실이사",
                        iconSrc: "/icons/ic_moving.svg",
                      },
                    ]}
                  />
                )
              }
            />
          </div>
        ))
      )}

      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="mt-4 flex h-10 items-center justify-center">
          <Spinner className="h-5 w-5 border-orange-400 border-t-transparent" />
        </div>
      )}
    </section>
  );
}
