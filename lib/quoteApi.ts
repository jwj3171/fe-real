import clientApi from "@/lib/api/axiosClient.client";
import serverApi from "./api/axiosClient.server";

export async function acceptQuote(quoteId: number) {
  const { data } = await clientApi.patch(`/quote/${quoteId}/accept`);
  return data as { message: string };
}

export async function getQuoteDetail(quoteId: number) {
  const { data } = await clientApi.get(`/quote/${quoteId}`);
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
      career: string;
      averageRating: number;
      totalReviews: number;
      img: string;
      _count?: { likes: number };
    };
    moveRequest?: {
      serviceType: "SMALL" | "FAMILY" | "OFFICE";
      departure: string;
      destination: string;
      moveDate: string;
    } | null;
  };
}

export async function getQuoteDetailServer(quoteId: number, token?: string) {
  const { data } = await serverApi.get(`/quote/${quoteId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data as Awaited<ReturnType<typeof getQuoteDetail>>;
}
