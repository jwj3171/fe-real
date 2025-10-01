import api from "@/lib/api/axiosClient";

export async function acceptQuote(quoteId: number) {
  const { data } = await api.patch(`/quote/${quoteId}/accept`);
  return data as { message: string };
}
