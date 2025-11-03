import MoverDetailMain from "@/components/MoverDetailMain";
import OrangeTopBanner from "@/components/OrangeTopBanner";
import { getMoverDetail } from "@/lib/api/mover";
import MoverDetailSideBar from "./components/MoverDetailSideBar";
import MoverDetailReview from "@/components/MoverDetailReview";

export default async function MoverDetailPage({
  params,
}: {
  params: Promise<{ moverId: string }>;
}) {
  const { moverId } = await params;
  const mover = await getMoverDetail(moverId);

  return (
    <>
      <OrangeTopBanner />
      <section className="relative">
        <div className="mx-auto -mt-12 grid max-w-[1120px] grid-cols-1 gap-8 px-6 md:grid-cols-[minmax(0,720px)_320px]">
          <div>
            <MoverDetailMain mover={mover} />
            <MoverDetailReview mover={mover} />
          </div>
          <MoverDetailSideBar mover={mover} />
        </div>
      </section>
    </>
  );
}
