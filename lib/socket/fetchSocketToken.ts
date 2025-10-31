// lib/socket/fetchSocketToken.ts
import clientApi from "@/lib/api/axiosClient.client"; // baseURL: "/api", withCredentials: true
import { useAuthStore } from "@/contexts/authStore";

export async function fetchSocketToken(): Promise<string> {
  const { userType } = useAuthStore.getState(); // "customer" | "mover"
  if (!userType) throw new Error("Not logged in");

  const url =
    userType === "customer"
      ? "/auth/customer/socket-token"
      : "/auth/mover/socket-token";

  const { data } = await clientApi.get(url); // 쿠키 동봉됨 (withCredentials: true)
  return data.socketToken as string;
}
