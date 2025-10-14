"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMoveRequestsByCustomerWhenDirect } from "@/lib/api/moveRequest";
import { useEffect, useState } from "react";
import { Buttons } from "@/components/common/button";
import Pagenation from "./Pagenation";
import createDirectRequest from "@/lib/api/directRequest";

export default function RequestList({ moverId }: { moverId: number }) {
  const [page, setPage] = useState(1);
  const [reloading, setReloading] = useState(true);
  const queryClient = useQueryClient();

  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ["customerActiveMoveRequests", page, moverId],
    queryFn: () => fetchMoveRequestsByCustomerWhenDirect(moverId, page),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });

  const moveRequests = data?.data;
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleCreateDirectRequest = async (moveRequestId: number) => {
    const response = await createDirectRequest(moverId, moveRequestId);
    queryClient.removeQueries({
      queryKey: ["customerActiveMoveRequests", page],
    });
    setReloading((prev) => !prev);
    console.log(response);
    return response;
  };

  // 컴포넌트 마운트 시 pre-fetching
  useEffect(() => {
    console.log(moveRequests);
  }, [page, reloading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!moveRequests || moveRequests.length === 0) {
    return (
      <div className="text-black-300 flex flex-col gap-10 p-4 text-center text-base">
        일반 견적 요청을 먼저 진행 해 주세요.
        <Buttons className="w-full">일반 견적 요청 하기</Buttons>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        {moveRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between border-b border-b-gray-200 p-4 transition-shadow hover:shadow-md"
          >
            <div className="space-y-0 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">출발지:</span>
                <span>{request.departure}</span>
                <span className="text-gray-400">
                  ({request.departureRegion})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">도착지:</span>
                <span>{request.destination}</span>
                <span className="text-gray-400">
                  ({request.destinationRegion})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">이사일:</span>
                <span>
                  {new Date(request.moveDate).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
            <Buttons
              onClick={() => handleCreateDirectRequest(request.id)}
              disabled={request.isDirectAlready}
            >
              요청하기
            </Buttons>
          </div>
        ))}
      </div>
      <Pagenation page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
