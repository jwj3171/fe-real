import type { Metadata } from "next";
import SearchControls from "./components/SearchControls";
import MoverSearchClient from "./MoverSearchclient";

export const metadata: Metadata = {
  title: "기사님 찾기",
  description: "지역/서비스/정렬/검색으로 이사 기사님을 찾아보세요.",
};

// Next 13+ app router: searchParams는 그냥 객체
export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const region =
    typeof searchParams.region === "string" ? searchParams.region : undefined;
  const service =
    typeof searchParams.service === "string" ? searchParams.service : undefined;
  const sort =
    typeof searchParams.sort === "string"
      ? (searchParams.sort as any)
      : "reviews";
  const page = Number(searchParams.page ?? 1) || 1;

  const initial = { q, region, service, sort, page };

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-6">
      <h1 className="mb-6 text-lg font-semibold">기사님 찾기</h1>
      <SearchControls />
      <MoverSearchClient initialParams={initial} />
    </main>
  );
}
