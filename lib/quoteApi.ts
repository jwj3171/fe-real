import clientApi from "@/lib/api/axiosClient.client";
import serverApi from "./api/axiosClient.server";

export async function acceptQuote(quoteId: number) {
  const { data } = await clientApi.patch(`/quote/${quoteId}/accept`);
  return data as { message: string };
}

export async function getQuoteDetailServer(quoteId: number, token?: string) {
  const { data } = await serverApi.get(`/quote/${quoteId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true,
  });

  return data as {
    id: number;
    price: number;
    comment: string | null;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    type: "NORMAL" | "DIRECT";
    createdAt: string;
    mover: {
      id: number;
      nickname: string;
      img?: string | null;
      career?: string | null;
      averageRating?: number | null;
      totalReviews?: number | null;
      _count?: { likes?: number };
    } | null;
    moveRequest: {
      id: number;
      serviceType: "SMALL" | "FAMILY" | "OFFICE";
      moveDate: string;
      departure: string;
      departureRegion: string;
      destination: string;
      destinationRegion: string;
    } | null;
  };
}

export async function getQuoteDetailForMoverServer(
  quoteId: number,
  token?: string,
) {
  const { data } = await serverApi.get(`/quote/quotes/${quoteId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true,
  });

  return data as {
    id: number;
    price: number;
    comment: string | null;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    type: "NORMAL" | "DIRECT";
    createdAt: string;
    customerName?: string | null;
    moveRequest: {
      id: number;
      serviceType: "SMALL" | "FAMILY" | "OFFICE";
      moveDate: string;
      departure: string;
      departureRegion?: string;
      destination: string;
      destinationRegion?: string;
    } | null;
  };
}
