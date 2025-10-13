// lib/api/axiosClient.server.ts
import axios from "axios";
// import { cookies } from "next/headers";

// 서버 전용 Axios 인스턴스 (Zustand 등 클라이언트 코드 없음)
const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // SSR에서 쿠키 인증 사용 가능
});

export default serverApi;
