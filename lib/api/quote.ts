// lib/api/quote.ts
import clientApi from "@/lib/api/axiosClient.client";

export interface SendEstimatePayload {
  moveRequestId: number;
  price: number;
  comment: string;
  type: "NORMAL" | "DIRECT"; // 일반요청/지정요청
}

export async function sendEstimateApi({
  moveRequestId,
  price,
  comment,
  type,
}: SendEstimatePayload) {
  const res = await clientApi.post(`/quote/move-requests/${moveRequestId}`, {
    price,
    comment,
    type,
  });
  return res.data;
}
