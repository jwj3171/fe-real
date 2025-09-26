import MoverHero from "@/components/MoverHero";
import Reviews from "./reviews.client";
import { getMover } from "@/lib/moverApi";
import { ServiceChip, RegionChip } from "@/components/common/chip/presets";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ moverId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { moverId } = await params;
  const sp = await searchParams;

  const mover = await getMover(moverId); // 서버 프리패치

  // 안전 기본값
  const services: string[] = Array.isArray((mover as any)?.services)
    ? (mover as any).services
    : [];
  const regions: string[] = Array.isArray((mover as any)?.regions)
    ? (mover as any).regions
    : [];

  return (
    <>
      <MoverHero mover={mover} />

      {/* 리뷰 섹션 */}
      <section className="mx-auto mt-10 max-w-[1120px] px-6">
        <Reviews moverId={moverId} initialPage={Number(sp.page ?? 1)} />
      </section>
    </>
  );
}
