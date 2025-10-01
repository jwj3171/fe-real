import api from "@/lib/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import type { MoveRequest } from "@/types/move";

export const MY_REQUESTS_KEYS = {
  root: ["myRequests"] as const,
  active: () => [...MY_REQUESTS_KEYS.root, "active"] as const,
  closed: () => [...MY_REQUESTS_KEYS.root, "closed"] as const,
};

export const useMyActive = () =>
  useQuery<MoveRequest[]>({
    queryKey: MY_REQUESTS_KEYS.active(),
    queryFn: async () =>
      (await api.get<MoveRequest[]>("/move-requests/customer/active")).data,
    staleTime: 30_000,
  });

export const useMyClosed = () =>
  useQuery<MoveRequest[]>({
    queryKey: MY_REQUESTS_KEYS.closed(),
    queryFn: async () =>
      (await api.get<MoveRequest[]>("/move-requests/customer/closed")).data,
    staleTime: 30_000,
  });
