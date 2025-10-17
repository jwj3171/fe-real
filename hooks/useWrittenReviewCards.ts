"use client";
import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import clientApi from "@/lib/api/axiosClient.client";
import { useQuotesByRequest } from "@/lib/queries/quotes";
import type { QuoteWithMover } from "@/types/move";

type MR = any;

const svcLabel: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};
const fmt = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";
const isObj = (x: any) => !!x && typeof x === "object";

// quotes 재사용
(useQuotesByRequest as any).fetchQuery = async (requestId: number) => {
  const r = await clientApi.get(`/quotes/byRequest/${requestId}`);
  return r.data;
};

// 여러 후보 엔드포인트를 순차 시도해서 첫 번째로 데이터가 있는 응답 반환
async function fetchMyRequestsFallback(): Promise<MR[]> {
  const candidates = [
    "/move-requests/customer/closed",
    "/move-requests/customer/active",
    "/bookings/customer",
    "/bookings/customer/completed",
  ];

  for (const url of candidates) {
    try {
      const res = await clientApi.get(url);
      const data = res.data;
      console.log(
        "🔎 [written] candidate:",
        url,
        "len:",
        Array.isArray(data) ? data.length : "N/A",
      );
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      console.warn("candidate failed:", url, e);
    }
  }
  return [];
}

/**
 * 내가 작성한 리뷰:
 *  - 예약(booking)이 존재
 *  - 예약 상태가 COMPLETED
 *  - 리뷰가 존재 (booking.reviews 있음)
 */
export function useWrittenReviewCards() {
  // 1) 내 요청/예약 목록 확보
  const directQ = useQueries({
    queries: [
      {
        queryKey: ["__reviews__written__fallback__"],
        queryFn: fetchMyRequestsFallback,
        staleTime: 0,
        retry: 0,
      },
    ],
  })[0];

  const all = (directQ.data as MR[]) ?? [];

  // 2) booking 기준 normalize + 필터링
  const targets = useMemo(() => {
    const normalized = (all as any[]).map((r) => {
      if (r?.serviceDate && r?.customerId && r?.quoteId) {
        return { ...r.moveRequest, booking: r };
      }
      return r;
    });

    const out = normalized.filter((r) => {
      const b = r?.booking;
      if (!b) return false;
      const completed = b?.status === "COMPLETED";
      const rv = (b as any)?.reviews;
      const hasReview = Array.isArray(rv) ? rv.length > 0 : !!rv;
      return completed && hasReview;
    });

    console.log("🟣 [written] all:", all);
    console.log("🟣 [written] normalized:", normalized);
    console.log("🟣 [written] targets:", out);
    return out;
  }, [all]);

  // 3) mover 정보 보완 (quotes 조회)
  const quoteQs = useQueries({
    queries: targets.map((r) => ({
      queryKey: ["quotes", "byRequest", r.id],
      queryFn: () => (useQuotesByRequest as any).fetchQuery(r.id),
      enabled: !isObj(r?.booking?.mover),
      staleTime: 60_000,
      retry: 0,
    })),
  });

  // 4) 카드 DTO 구성
  const items = useMemo(() => {
    const arr = targets.map((r, i) => {
      const b = r.booking!;
      const revSrc = b?.reviews ?? r.reviews;
      const rev = Array.isArray(revSrc) ? revSrc[0] : revSrc;

      const bm = isObj(b?.mover) ? (b.mover as any) : undefined;
      let moverName = bm?.nickname ?? bm?.name ?? "";
      let avatarUrl = bm?.img ?? "";
      let reviewCount = bm?.totalReviews ?? 0;

      if (!moverName) {
        const qs = (quoteQs[i]?.data as QuoteWithMover[] | undefined) ?? [];
        const acc = qs.find((q) => q.status === "ACCEPTED");
        const m = acc?.mover as any;
        if (isObj(m)) {
          moverName = m.nickname || m.name || "이사업체";
          avatarUrl = m.img || "";
          reviewCount = m.totalReviews ?? 0;
        }
      }

      return {
        bookingId: b.id,
        moverName: moverName || "이사업체",
        moverAvatarUrl: avatarUrl,
        serviceLabel: svcLabel[r.serviceType] ?? "이사",
        from: `${r.departure} (${r.departureRegion})`,
        to: `${r.destination} (${r.destinationRegion})`,
        moveDate: fmt(b.serviceDate ?? r.moveDate),
        price: b.priceSnapshot ?? 0,
        reviewId: rev?.id,
        rating: Number(rev?.rating) || 0,
        content: String(rev?.content ?? ""),
        createdAt: fmt(rev?.createdAt),
        reviewCount,
      };
    });

    console.log("🟣 [written] items:", arr);
    return arr;
  }, [targets, quoteQs]);

  const isLoading = directQ.isLoading || quoteQs.some((q) => q.isLoading);
  if (directQ.error) console.error("❌ [written] loader error:", directQ.error);

  return { items, isLoading };
}
