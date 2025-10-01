import api from "@/lib/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import type { QuoteWithMover } from "@/types/move";

export const useQuotesByRequest = (moveRequestId: number) =>
  useQuery<QuoteWithMover[]>({
    queryKey: ["quotes", "byRequest", moveRequestId],
    queryFn: async () => {
      const { data } = await api.get<QuoteWithMover[]>(
        `/quote/move-requests/${moveRequestId}`,
      );
      return data;
    },
    enabled: Number.isFinite(moveRequestId),
    staleTime: 30_000,
  });
