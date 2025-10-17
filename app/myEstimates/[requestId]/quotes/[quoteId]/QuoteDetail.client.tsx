"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptQuote } from "@/lib/quoteApi";
import { Buttons } from "@/components/common/button";
import { ServiceChip } from "@/components/common/chip";
import LikeCounter from "@/components/common/card/Mover/LikeCounter";
import { useRouter } from "next/navigation";
import { useEstimatesTabStore } from "@/store/estimatesTabStore";
import { MY_REQUESTS_KEYS } from "@/lib/queries/myRequests";

type Detail = Awaited<
  ReturnType<typeof import("@/lib/quoteApi").getQuoteDetail>
>;

const svcMap = {
  SMALL: { label: "소형이사", icon: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", icon: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", icon: "/icons/ic_company.svg" },
} as const;

const typeMap = {
  NORMAL: { label: "일반 견적", icon: "/icons/ic_moving.svg" },
  DIRECT: { label: "지정 견적 요청", icon: "/icons/ic_document.svg" },
} as const;

export default function QuoteDetailClient({ detail }: { detail: Detail }) {
  const router = useRouter();
  const qc = useQueryClient();
  const setTab = useEstimatesTabStore((s) => s.setTab);

  const { mutate: confirm, isPending } = useMutation({
    mutationFn: () => acceptQuote(detail.id),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({
          queryKey: ["quotes", "byRequest", detail.moveRequestId],
        }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.active() }),
        qc.invalidateQueries({ queryKey: MY_REQUESTS_KEYS.closed() }),
      ]);
      setTab("confirmed");
      router.replace("/myEstimates?tab=confirmed");
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message ?? "견적 확정 중 오류가 발생했습니다.");
    },
  });

  const m = detail.mover;
  const mr = detail.moveRequest;
  const svc = svcMap[mr.serviceType];
  const typ = typeMap[detail.type];
  const price = new Intl.NumberFormat("ko-KR").format(detail.price);
  const createdAt = new Date(mr.createdAt).toLocaleDateString("ko-KR");

  return (
    <section className="relative">
      {/* 오렌지 배너 */}
      <div className="w-full bg-[#FF5A3D]">
        <div className="mx-auto h-[225px] max-w-[1920px]" />
      </div>

      <div className="mx-auto -mt-12 grid max-w-[1120px] grid-cols-1 gap-8 px-6 md:grid-cols-[minmax(0,720px)_320px]">
        {/* 좌측 */}
        <div>
          {/* 아바타 */}
          <div className="flex">
            <div className="relative -mt-10 h-[96px] w-[96px] overflow-hidden rounded-2xl bg-white shadow-md">
              <Image
                src={m.img || "/assets/profile_mover_detail.svg"}
                alt={`${m.nickname} 프로필`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 칩 */}
          <div className="mt-3 flex gap-2">
            <ServiceChip iconSrc={svc.icon} size="sm">
              {svc.label}
            </ServiceChip>
            <ServiceChip iconSrc={typ.icon} size="sm">
              {typ.label}
            </ServiceChip>
          </div>

          {/* 한줄 소개 & 좋아요 */}
          <div className="relative mt-3">
            <p className="text-[18px] font-extrabold text-zinc-900">
              {detail.comment ?? "고객님의 물품을 안전하게 운송해 드립니다."}
            </p>
            <div className="absolute top-0 right-0 hidden items-center gap-2 text-sm text-zinc-500 md:flex">
              <LikeCounter count={m._count?.likes ?? 0} />
            </div>
          </div>

          {/* 기사 요약 */}
          <div className="mt-2 flex items-center gap-3 text-sm text-zinc-600">
            <span className="font-semibold">{m.nickname} 기사님</span>
            <span>·</span>
            <span>
              {(m.averageRating ?? 0).toFixed(1)}점 ({m.totalReviews ?? 0}건)
            </span>
            <span>·</span>
            <span>{m.career}</span>
          </div>

          {/* 견적가 */}
          <div className="mt-6 flex items-center gap-6">
            <span className="text-sm text-zinc-500">견적가</span>
            <span className="text-[20px] font-bold text-zinc-900">
              {price}원
            </span>
          </div>

          {/* 견적 정보 */}
          <section className="mt-10">
            <h3 className="mb-3 text-[14px] font-semibold text-zinc-900">
              견적 정보
            </h3>
            <div className="grid gap-4 text-[14px] text-zinc-800 sm:grid-cols-2">
              <InfoRow label="견적 요청일" value={createdAt} />
              <InfoRow label="서비스" value={svc.label} />
              <InfoRow
                label="이용일"
                value={new Date(mr.moveDate).toLocaleString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
              <InfoRow
                label="출발지"
                value={`${mr.departure} (${mr.departureRegion})`}
              />
              <InfoRow
                label="도착지"
                value={`${mr.destination} (${mr.destinationRegion})`}
              />
            </div>
          </section>
        </div>

        {/* 우측 */}
        <aside className="flex w-full flex-col gap-4 md:w-[320px]">
          <div className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-zinc-500">견적가</div>
            <div className="mt-1 text-xl font-bold text-zinc-900">
              {price}원
            </div>

            <Buttons
              className="mt-4 w-full rounded-[16px]"
              size="figma"
              onClick={() => confirm()}
              disabled={isPending || detail.status !== "PENDING"}
            >
              {isPending ? "확정 중..." : "견적 확정하기"}
            </Buttons>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-zinc-900">{value}</span>
    </div>
  );
}
