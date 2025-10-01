import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MoversListParams, MoversListPage } from "@/lib/api/mover";
import {
  getMoverList,
  getMoverDetail,
  getTopLikedMovers,
} from "@/lib/api/mover";

export function useMoverListPage(params: MoversListParams) {
  return useQuery<MoversListPage>({
    queryKey: ["mover-list", params],
    queryFn: () => getMoverList(params),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}

export function useMoverDetail(id?: number | string) {
  return useQuery({
    queryKey: ["mover", id],
    queryFn: () => getMoverDetail(String(id)),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useTopLikedMovers() {
  return useQuery({
    queryKey: ["mover", "likes-top3"],
    queryFn: getTopLikedMovers,
    staleTime: 60_000,
    retry: (count, err: any) => {
      if (String(err?.message || "").includes("401")) return false;
      return count < 2;
    },
  });
}
