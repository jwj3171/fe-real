// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import HeaderRefactor from "@/components/header/HeaderRefactor";
import Header from "@/components/header/Header";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { customerGetMe, moverGetMe } from "@/lib/auth";

type UserType = "customer" | "mover";

export const metadata: Metadata = {
  title: "Moving",
  description: "무빙",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  let userType = cookieStore.get("userType")?.value as UserType | undefined;

  const accessToken = cookieStore.get("accessToken")?.value;
  // console.log("layout.tsx accessToken : ", accessToken);

  // userType 쿠키가 없으면 accessToken 디코딩으로 판별
  if (!userType && accessToken) {
    try {
      const payload = JSON.parse(
        Buffer.from(accessToken.split(".")[1], "base64").toString("utf-8"),
      );
      const raw = String(
        payload.userType || payload.role || payload.type || "",
      ).toLowerCase();
      if (raw === "mover" || raw === "customer") userType = raw as UserType;
    } catch (e) {
      console.warn("Failed to decode userType from accessToken:", e);
    }
  }

  //customer 나 mover일 경우 reactquery prefetch
  if (userType) {
    await queryClient.prefetchQuery({
      queryKey: ["me", userType],
      queryFn: () =>
        userType === "customer"
          ? customerGetMe(accessToken)
          : moverGetMe(accessToken),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <body>
        <Providers>
          <HydrationBoundary state={dehydratedState}>
            <HeaderRefactor initialUserType={userType} />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
