import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axiosClient.client";
import type { Paginated } from "@/types/mover";
import type { MoveRequestForMover, DirectRequestRow } from "@/types/mover";

export function useNormalRequests(params?: {
  pageSize?: number;
  enabled?: boolean;
}) {
  const pageSize = params?.pageSize ?? 10;
  return useInfiniteQuery({
    queryKey: ["mover", "requests", "normal", { pageSize }],
    initialPageParam: 1,
    enabled: params?.enabled ?? true,
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    queryFn: async ({ pageParam }) => {
      const body = { page: pageParam, pageSize, status: ["ACTIVE"] };
      const { data } = await api.post<Paginated<MoveRequestForMover>>(
        "/move-requests/search",
        body,
      );
      return data;
    },
    staleTime: 30_000,
  });
}

export function useDirectRequests(params?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["mover", "requests", "direct", "default"],
    enabled: params?.enabled ?? true, // ✅ 추가
    queryFn: async () => {
      const { data } = await api.get<Paginated<DirectRequestRow>>(
        "/move-requests/direct",
      );
      return data;
    },
    staleTime: 30_000,
    keepPreviousData: true,
    retry: 0,
  });
}
