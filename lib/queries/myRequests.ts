import api from "@/lib/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import type { MoveRequest } from "@/types/move";

export const useMyActive = () =>
  useQuery<MoveRequest[]>({
    queryKey: ["myRequests", "active"],
    queryFn: async () =>
      (await api.get<MoveRequest[]>("/move-requests/customer/active")).data,
    staleTime: 30_000,
  });

export const useMyClosed = () =>
  useQuery<MoveRequest[]>({
    queryKey: ["myRequests", "closed"],
    queryFn: async () =>
      (await api.get<MoveRequest[]>("/move-requests/customer/closed")).data,
    staleTime: 30_000,
  });
