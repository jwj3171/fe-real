import MoverName from "@/components/common/card/Mover/MoverName";
import MoverDescription from "@/components/common/card/Mover/MoverDescription";
import { Chip } from "@/components/common/chip/Chips";
import Image from "next/image";
import LikesCount from "./LikesCount";

type Props = { mover: any };

const SERVICE_LABELS: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

export default function MoverDetailMain({ mover }: Props) {
  const services = (mover.moverServiceTypes as any[]) ?? [];
  const regions = (mover.moverRegions as any[]) ?? [];

  return (
    <div className="relative mx-auto w-full">
      {/* 아바타 */}
      <div className="flex w-full">
        <div className="relative -mt-10 h-[96px] w-[96px] overflow-hidden rounded-2xl bg-white shadow-md">
          <Image
            src="/assets/profile_mover_detail.svg"
            alt={`${mover.nickname} 프로필`}
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* 카테고리 배지(예: 소형이사) */}
      {services.length > 0 && (
        <section className="mt-2">
          <div className="flex flex-wrap gap-3">
            {services.map((s) => (
              <Chip key={s.id} variant="solid" color="primary" size="xs">
                {SERVICE_LABELS[s.serviceType] ?? s.serviceType}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {/* 소개 */}
      <div className="mx-auto mt-2 max-w-[720px]">
        <MoverDescription
          description={mover.introduction}
          className="self-stretch text-[24px] font-semibold text-zinc-900"
        />
      </div>

      {/* 제목 + 좋아요 */}
      <div className="relative mt-3">
        <div className="text-center">
          <MoverName
            MoverName={`${mover.name}`}
            className="text-[18px] font-extrabold text-zinc-900"
          />
        </div>
        <LikesCount moverId={mover.id} />
      </div>

      {/* 소개 */}
      <div className="mx-auto mt-2 max-w-[720px]">
        <MoverDescription
          description={mover.description}
          className="text-[16px] leading-relaxed text-zinc-600"
        />
      </div>

      {/* 통계 3칸 */}
      <div className="mx-auto mt-6 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "진행", value: `${mover._count.bookings}건` },
          {
            label: "리뷰",
            value: `⭐️ ${mover.averageRating.toFixed(1)} (${mover.totalReviews})`,
          },
          { label: "총 경력", value: `${mover.career}` },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-zinc-200 bg-white px-5 py-4"
          >
            <div className="text-[13px] text-zinc-500">{c.label}</div>
            <div className="text-[16px] font-semibold text-zinc-900">
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* ───────── 제공 서비스(칩) ───────── */}
      {services.length > 0 && (
        <section className="mt-8">
          <h3 className="mb-3 text-[14px] font-semibold text-zinc-900">
            제공 서비스
          </h3>
          <div className="flex flex-wrap gap-3">
            {services.map((s) => (
              <Chip key={s.id} variant="solid" color="primary" size="lg">
                {SERVICE_LABELS[s.serviceType] ?? s.serviceType}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {/* ──────── 서비스 가능 지역(칩) ──────── */}
      {regions.length > 0 && (
        <section className="mt-6">
          <h3 className="mb-3 text-[14px] font-semibold text-zinc-900">
            서비스 가능 지역
          </h3>
          <div className="flex flex-wrap gap-3">
            {regions.map((r) => (
              <Chip key={r.id} variant="solid" color="neutral" size="lg">
                {r.region}
              </Chip>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
