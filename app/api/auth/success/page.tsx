"use client";

import { useAuthStore } from "@/contexts/authStore";
import { onLoginSuccess } from "@/hooks/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (type === "customer") {
      onLoginSuccess("customer", queryClient, setAuth, router);
      router.push("/landing");
    } else if (type === "mover") {
      onLoginSuccess("mover", queryClient, setAuth, router);
      router.push("/landing");
    }
  }, [type]);

  return <div>간편 로그인 성공! 잠시만 기다려 주세요.</div>;
}
