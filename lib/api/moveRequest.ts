// lib/api/moveRequest.ts
import clientApi from "./axiosClient.client";
import serverApi from "./axiosClient.server";

export interface MoveRequestItem {
  destination: string;
  departure: string;
  id: number;
  customerName: string;
  description: string;
  departureRegion: string;
  destinationRegion: string;
  moveDate: string;
  serviceType: string;
  status: string;
  myQuote?: {
    id: number;
    price: number;
    comment: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    type: "NORMAL" | "DIRECT";
  } | null;
}

export interface MoveRequestResponse {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: MoveRequestItem[];
}

export interface MoveRequestFilter {
  page?: number;
  pageSize?: number;
  sort?: { field: string; order: "asc" | "desc" };
  status?: string[];
  regions?: string[];
  departureRegions?: string[];
  destinationRegions?: string[];
  serviceTypes?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export async function fetchMoveRequests(
  filters: MoveRequestFilter,
  token?: string,
): Promise<MoveRequestResponse> {
  const isServer = typeof window === "undefined";
  const api = isServer ? serverApi : clientApi;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await api.post("/move-requests/search", filters, { headers });
  // console.log(res);

  if (isServer) {
    // 서버 환경
    console.log("🌐 [SERVER] Prefetch 실행됨", filters);
    console.log("🍪 [SERVER] serverApi 쿠키 인증 사용");
    console.log(
      "🌐 [SERVER] headers",
      token ? { Authorization: `Bearer ${token}` } : "no token",
    );
  } else {
    // 브라우저 환경
    console.log("🖥️ [CLIENT] useInfiniteQuery 실행됨", filters);
  }

  return res.data;
}
