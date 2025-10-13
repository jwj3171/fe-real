import api from "./axiosClient";

export default async function createDirectRequest(
  moverId: number,
  moveRequestId: number,
) {
  const res = await api.post(`/direct-quote-request`, {
    moverId,
    moveRequestId,
  });
  return res.data;
}
