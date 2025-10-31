// lib/socket/socket.ts
import { io, Socket } from "socket.io-client";
import { fetchSocketToken } from "./fetchSocketToken";

let socket: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
  if (socket && socket.connected) return socket;

  const token = await fetchSocketToken();

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    path: "/socket.io",
    transports: ["websocket", "polling"], // 폴백 허용 강추
    withCredentials: false, // payload 방식이라 불필요
    auth: { token }, // ✅ 핵심
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    autoConnect: true,
  });

  // 토큰만료 등으로 끊길 때 자동 재발급 후 재시도
  socket.on("connect_error", async (err: any) => {
    console.warn("[SOCKET CONNECT ERROR]", err?.message);
    if (!socket) return;
    try {
      const fresh = await fetchSocketToken();
      socket.auth = { token: fresh };
      // socket.connect(); // socket.io가 자동 재시도 중이면 생략해도 OK
    } catch (e) {
      console.error("socket token refresh failed", e);
    }
  });

  socket.on("connect", () => {
    console.log("[SOCKET CONNECTED]", socket?.id);
  });
  socket.on("disconnect", (reason) => {
    console.warn("[SOCKET DISCONNECT]", reason);
  });

  return socket;
}

export function getSocket(): Socket {
  if (!socket) throw new Error("Call connectSocket() first");
  return socket;
}

// 필요 시 수동 갱신
export async function refreshSocketAuth() {
  if (!socket) return;
  const fresh = await fetchSocketToken();
  socket.auth = { token: fresh };
  if (socket.disconnected) socket.connect();
}

export function disconnectSocket() {
  if (socket) {
    try {
      if (socket.connected) socket.disconnect();
    } finally {
      socket = null; // 참조 정리
    }
  }
}

export function isSocketConnected(): boolean {
  return !!(socket && socket.connected);
}

// // lib/socket/socket.ts
// import { io, Socket } from "socket.io-client";
// // import Cookies from "js-cookie";

// let socket: Socket | null = null;

// // function getToken(): string | undefined {
// //   // 쿠키 우선, 없다면 로컬스토리지(프로젝트 정책에 맞춰 한쪽만 써도 OK)
// //   return Cookies.get("accessToken") || undefined;
// // }

// export function getSocket(): Socket {
//   if (socket) return socket;

//   socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3000", {
//     // socket = io("http://localhost:4000", {
//     path: "/socket.io", // 기본값
//     transports: ["websocket", "polling"],
//     // transports: ["websocket"],
//     withCredentials: true,
//     // auth: { token: getToken() }, // ✅ 최초 연결 시 토큰 탑재
//     reconnection: true,
//     reconnectionAttempts: Infinity,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     randomizationFactor: 0.5,
//   });

//   // // 재연결 시도 직전에 최신 토큰 주입
//   // socket.io.on("reconnect_attempt", () => {
//   //   if (!socket) return;
//   //   socket.auth = { token: getToken() }; // ✅ 매 시도마다 최신 토큰
//   // });
//   // 쿠키 방식은 재연결 시 별도 토큰 주입 불필요

//   // 첫 연결 실패 시에도 다음 시도 전에 최신 토큰 갱신
//   socket.on("connect_error", (err: any) => {
//     console.log(
//       "connect_error:",
//       err?.message,
//       err?.description,
//       err?.context ?? err,
//     );
//     // if (!socket) return;
//     // socket.auth = { token: getToken() }; // ✅ 최신 토큰으로 교체
//     // // socket.connect(); // 자동 재시도라 보통 불필요
//   });

//   // ✅ 디버그 로그: 인증/연결 문제 즉시 확인
//   socket.on("connect", () => {
//     console.log("[SOCKET CONNECTED]", socket?.id);
//   });
//   socket.on("connect_error", (err) => {
//     console.error("[SOCKET CONNECT ERROR]", err?.message, err);
//   });
//   socket.on("disconnect", (reason) => {
//     console.warn("[SOCKET DISCONNECT]", reason);
//   });

//   return socket;
// }

// export function refreshSocketAuth() {
//   // 쿠키 방식은 갱신 불필요(쿠키 갱신되면 다음 핸드셰이크/폴링에 자동 반영)
//   if (socket?.disconnected) socket.connect();
// }
// // export function refreshSocketAuth() {
// //   if (!socket) return;
// //   socket.auth = { token: getToken() };
// //   if (socket.disconnected) socket.connect(); // 토큰바뀐 후 즉시 재시도
// // }
