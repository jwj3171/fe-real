import clientApi from "@/lib/api/axiosClient.client";
import serverApi from "./api/axiosClient.server";

export async function acceptQuote(quoteId: number) {
  const { data } = await clientApi.patch(`/quote/${quoteId}/accept`);
  return data as { message: string };
}

export async function getQuoteDetailServer(quoteId: number, token?: string) {
  const api = serverApi;
  const { data } = await api.get(`/quote/${quoteId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data as {
    id: number;
    price: number;
    comment: string | null;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    type: QuoteType;
    createdAt: string;
    mover?: {
      id: number;
      nickname: string;
      career: string;
      averageRating: number;
      totalReviews: number;
      img: string;
      _count?: { likes: number };
    };
    moveRequest?: {
      serviceType: ServiceType;
      departure: string;
      departureRegion?: string;
      destination: string;
      destinationRegion?: string;
      moveDate: string;
    } | null;
  };
}
