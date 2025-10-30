// lib/api/snsAuth.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const snsLoginUrls = {
  customer: {
    google: "/api/auth/customer/google",
    kakao: "/api/auth/customer/kakao",
    naver: "/api/auth/customer/naver",
  },
  mover: {
    google: "/api/auth/mover/google",
    kakao: "/api/auth/mover/kakao",
    naver: "/api/auth/mover/naver",
  },
} as const;

export type SnsProvider = keyof typeof snsLoginUrls.customer;
export type UserType = keyof typeof snsLoginUrls;

export const handleSnsLogin = async (
  provider: SnsProvider,
  userType: UserType = "customer",
) => {
  const loginUrl = snsLoginUrls[userType][provider];
  return await GET(loginUrl);
};

export async function GET(url: string) {
  try {
    // 백엔드로 요청 보내기 — 리다이렉트를 수동으로 처리
    const backendRes = await axios.get(`http://localhost:3000${url}`, {
      maxRedirects: 0, // 중요: 302 응답을 자동으로 따라가지 않음
      validateStatus: (status) => status >= 200 && status < 400, // 3xx도 허용
    });

    // 백엔드에서 보낸 리다이렉트 위치와 쿠키를 추출
    const location = backendRes.headers["location"] || "/";
    const setCookie = backendRes.headers["set-cookie"];

    // Next.js의 리다이렉트 응답 생성
    const res = NextResponse.redirect(location);

    // 쿠키가 있다면 클라이언트로 그대로 전달
    if (setCookie) {
      // axios는 set-cookie를 배열로 반환할 수 있습니다.
      // 여러 쿠키가 있다면 모두 전달해야 합니다.
      if (Array.isArray(setCookie)) {
        res.headers.set("set-cookie", setCookie.join(", "));
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }

    return res;
  } catch (err: any) {
    // 백엔드에서 예외 발생 시 에러 반환
    console.error("OAuth redirect proxy error:", err.message);
    return NextResponse.json({ error: "OAuth proxy failed" }, { status: 500 });
  }
}
