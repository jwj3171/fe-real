"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axiosClient";

export function useRejectDirectRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: number; comment: string }) => {
      const { id, comment } = payload;
      const { data } = await api.post(`/direct-quote-request/${id}/rejected`, {
        comment,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["directRequests", "mine"] });
    },
  });
}
