// import type { Metadata } from "next";
// import SearchControls from "./components/SearchControls";
// import MoverSearchClient from "./MoverSearch.client";

// export const metadata: Metadata = {
//   title: "기사님 찾기",
//   description: "지역/서비스/정렬/검색으로 이사 기사님을 찾아보세요.",
// };

// type SP = Record<string, string | string[] | undefined>;
// const pick = (sp: SP, key: string) =>
//   Array.isArray(sp[key]) ? sp[key]![0] : sp[key];

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<SP>;
// }) {
//   const sp = await searchParams;

//   const q = (pick(sp, "q") ?? "") as string;
//   const region = (pick(sp, "region") || undefined) as string | undefined;
//   const service = (pick(sp, "service") || undefined) as string | undefined;
//   const sort = ((pick(sp, "sort") as any) ?? "reviews") as
//     | "reviews"
//     | "rating"
//     | "career"
//     | "quotes";
//   const page = Number(pick(sp, "page") ?? 1) || 1;

//   const initial = { q, region, service, sort, page };

//   return (
//     <main className="mx-auto max-w-[1120px] px-6 py-6">
//       <h1 className="mb-6 text-lg font-semibold">기사님 찾기</h1>
//       <SearchControls />
//       <MoverSearchClient initialParams={initial} />
//     </main>
//   );
// }

import type { Metadata } from "next";
import SearchControls from "./components/SearchControls";
import MoverSearchClient from "./MoverSearch.client";
import FavoritesAside from "./components/FavoritesAside";

export const metadata: Metadata = {
  title: "기사님 찾기",
  description: "지역/서비스/정렬/검색으로 이사 기사님을 찾아보세요.",
};

type SP = Record<string, string | string[] | undefined>;
const pick = (sp: SP, key: string) =>
  Array.isArray(sp[key]) ? (sp[key] as string[])[0] : sp[key];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const q = (pick(sp, "q") ?? "") as string;
  const region = (pick(sp, "region") || undefined) as string | undefined;
  const service = (pick(sp, "service") || undefined) as string | undefined;
  const sort = ((pick(sp, "sort") as any) ?? "reviews") as
    | "reviews"
    | "rating"
    | "career"
    | "quotes";
  const page = Number(pick(sp, "page") ?? 1) || 1;

  const initial = { q, region, service, sort, page };

  // (선택) 오른쪽 사이드의 "찜한 기사님" 데이터
  // 백엔드 준비되면 여기서 서버 fetch로 교체하면 됩니다.
  const likedMovers: Array<{
    id: string;
    name: string;
    title: string;
    avatarUrl: string;
    badge?: string; // 예: "사무실이사"
    rating?: number; // 예: 5.0
    moves?: number; // 예: 334건
    confirmed?: number; // 예: 확정 N건
  }> = [];

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-6">
      <h1 className="mb-6 text-lg font-semibold">기사님 찾기</h1>

      {/* 검색 컨트롤 (전체 폭) */}
      <SearchControls />

      {/* 결과 + 사이드 */}
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
        {/* 왼쪽: 결과 리스트 */}
        <section>
          <MoverSearchClient initialParams={initial} />
        </section>

        {/* 오른쪽: 찜한 기사님 */}
        <aside className="md:sticky md:top-4">
          <FavoritesAside items={likedMovers} />
        </aside>
      </div>
    </main>
  );
}
