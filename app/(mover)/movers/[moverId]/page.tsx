import MoverHero from "@/components/MoverHero";
import { getMoverDetail } from "@/lib/api/mover";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ moverId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { moverId } = await params;
  const mover = await getMoverDetail(moverId);

  console.log(mover);

  return (
    <>
      <MoverHero mover={mover} />
    </>
  );
}
