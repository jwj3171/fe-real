// hooks/useMoveRequests.ts
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoveRequests, MoveRequestFilter } from "@/lib/api/moveRequest";

export function useMoveRequests(filters: MoveRequestFilter, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["moveRequests", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
  });
}
