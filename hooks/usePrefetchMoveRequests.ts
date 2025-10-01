// hooks/usePrefetchMoveRequests.ts
"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchMoveRequests, MoveRequestFilter } from "@/lib/api/moveRequest";

export function usePrefetchMoveRequests(
  filters: MoveRequestFilter,
  enabled: boolean,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (enabled) {
      queryClient.prefetchInfiniteQuery({
        queryKey: ["moveRequests", filters],
        queryFn: ({ pageParam = 1 }) =>
          fetchMoveRequests({ ...filters, page: pageParam }),
        initialPageParam: 1,
      });
    }
  }, [enabled, filters, queryClient]);
}
