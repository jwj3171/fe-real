// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import HeaderRefactor from "@/components/header/HeaderRefactor";
import { headers } from "next/headers";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { customerGetMe, moverGetMe } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Moving",
  description: "무빙",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const userType = headerList.get("userType");
  const hasProfile = headerList.get("hasProfile");
  const queryClient = new QueryClient();

  //customer 나 mover일 경우 reactquery prefetch
  if (userType) {
    await queryClient.prefetchQuery({
      queryKey: ["me", userType],
      queryFn: userType === "customer" ? customerGetMe : moverGetMe,
    });
  }

  return (
    <html lang="ko">
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderRefactor />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
