import clientApi from "@/lib/api/axiosClient.client";

export async function acceptQuote(quoteId: number) {
  const { data } = await clientApi.patch(`/quote/${quoteId}/accept`);
  return data as { message: string };
}
