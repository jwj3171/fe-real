// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerSignIn, moverSignIn } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { useRouter } from "next/navigation";
import { connectSocket } from "@/lib/socket/socket";
// import { getSocket, refreshSocketAuth } from "@/lib/socket/socket";

export const onLoginSuccess = (
  userType: "customer" | "mover",
  queryClient: ReturnType<typeof useQueryClient>,
  setAuth: (userType: "customer" | "mover") => void,
  router: ReturnType<typeof useRouter>,
  redirectTo = "/landing",
) => {
  //로그인 성공 - Zustand 상태 업데이트
  setAuth(userType);
  // React Query 캐시 무효화 하고 다시 me api 호출
  queryClient.invalidateQueries({ queryKey: ["me", userType] });

  console.log("이 onLoginSuccess 실행됨?");

  // refreshSocketAuth();
  // getSocket();
   // ✅ 소켓 연결(토큰 발급 → auth payload로 connect)
 // 1) 바로 실행하고 싶다면 async/await로 바꾸거나
 // 2) fire-and-forget으로 호출만 해도 자동 재시도 동작
 (async () => {
   try { await connectSocket(); } catch (e) { console.warn(e); }
 })();

  //리다이렉트. 기본적으로는 landing. 추후 수정 가능
  router.push(redirectTo)
};

export const useLogin = (userType: "customer" | "mover") => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const mutationFn = userType === "customer" ? customerSignIn : moverSignIn;

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      mutationFn(email, password),
    onSuccess: () =>
      onLoginSuccess(userType, queryClient, setAuth, router, "/landing"),
  });
};

//로그아웃 시 - 쿠키삭제api로 or useAuthStore().logout()
