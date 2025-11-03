import MoverDetailMain from "@/components/MoverDetailMain";
import OrangeTopBanner from "@/components/OrangeTopBanner";
import { getMyProfile } from "@/lib/api/mover";
import MoverDetailReview from "@/components/MoverDetailReview";
import EditButtons from "./components/EditButtons";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString(); // 전체 쿠키 문자열
  const mover = await getMyProfile(cookieHeader);

  return (
    <>
      <OrangeTopBanner />
      <section className="relative">
        <div className="mx-auto -mt-12 grid max-w-[1120px] grid-cols-1 gap-8 px-6 md:grid-cols-[minmax(0,720px)_320px]">
          <div>
            <MoverDetailMain mover={mover} />
            <MoverDetailReview mover={mover} />
          </div>
          <EditButtons />
        </div>
      </section>
    </>
  );
}
