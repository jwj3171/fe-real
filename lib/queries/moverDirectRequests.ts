"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axiosClient";
import type { MoveRequest } from "@/types/move";

export type DirectRequest = {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  createdAt: string;
  moveRequest: MoveRequest;
};

export const useDirectRequests = () =>
  useQuery<DirectRequest[]>({
    queryKey: ["directRequests", "mine"],
    queryFn: async () => {
      const { data } = await api.get<DirectRequest[]>("/move-request/direct");
      return data;
    },
    staleTime: 30_000,
  });
