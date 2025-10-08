import clientApi from "@/lib/api/axiosClient.client";
import { useQuery } from "@tanstack/react-query";
import type { QuoteWithMover } from "@/types/move";

export const useQuotesByRequest = (moveRequestId: number) =>
  useQuery<QuoteWithMover[]>({
    queryKey: ["quotes", "byRequest", moveRequestId],
    queryFn: async () => {
      const { data } = await clientApi.get<QuoteWithMover[]>(
        `/quote/move-requests/${moveRequestId}`,
      );
      return data;
    },
    enabled: Number.isFinite(moveRequestId),
    staleTime: 30_000,
  });
