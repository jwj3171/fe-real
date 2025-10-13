// hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";
import { useAuthStore } from "@/contexts/authStore";
import { MeResponse } from "@/types/auth";

export function useMe(userType?: "customer" | "mover") {
  return useQuery<MeResponse | { json: MeResponse }>({
    queryKey: ["me", userType ?? "unknown"],
    queryFn: async () => {
      if (userType === "customer") return customerGetMe();
      if (userType === "mover") return moverGetMe();

      try {
        return await moverGetMe();
      } catch {
        return await customerGetMe();
      }

      // throw new Error("No user type selected"); //@TODO 에러 정의
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5분동안은 fresh 취급
    retry: false,
    select: (raw): MeResponse => {
      if (raw && typeof raw === "object" && "json" in raw) {
        return (raw as any).json as MeResponse;
      }
      return raw as MeResponse;
    },
    placeholderData: (prev) => prev,
    // enabled: isAuthenticated(),
    // enabled: !!userType,
    // retry: false, // 401은 인터셉터가 처리

    //프로필 수정 같은 변동사항 발생시 queryClient.invalidateQueries(["me", userType]) 으로 강제 갱신가능
  });
}
