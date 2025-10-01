// app/search/page.tsx
import type { Metadata } from "next";
import CardHeaderMover from "@/components/common/card/CardMover";
import SortMenu from "./components/SortMenu";

/** (선택) SEO */
export const metadata: Metadata = {
  title: "기사님 찾기",
  description: "지역/서비스/정렬로 기사님을 찾아보세요.",
};

/** 검색 파라미터 타입 */
type SearchParams = {
  q?: string;
  region?: string;
  service?: string;
  sort?: "평점 높은순" | "리뷰 많은순" | "확정 많은순";
};

/** 서버에서 데이터를 받아오는 자리에 연결될 목함수 (팀원 API로 쉽게 교체 가능) */
async function fetchMovers(params: SearchParams) {
  // NOTE: 추후 백엔드 API로 교체 (예: await fetch(`${API}/movers?${qs}`))
  console.log("[/search] params:", params); // 디버그

  // 간단 목데이터
  const base = [
    {
      id: "2",
      name: "박이사",
      intro: "친절/안전 최우선! 시간 약속 철저히 지킵니다.",
      rating: 4.8,
      reviewCount: 400,
      careerYears: 6,
      confirmedCount: 210,
    },
    {
      id: "1",
      name: "홍길동",
      intro: "고객님의 물품을 안전하게 운송해 드립니다.",
      rating: 5.0,
      reviewCount: 178,
      careerYears: 7,
      confirmedCount: 12,
    },
    {
      id: "3",
      name: "이무빙",
      intro: "합리적 비용, 깔끔한 마무리 약속드립니다.",
      rating: 4.6,
      reviewCount: 54,
      careerYears: 4,
      confirmedCount: 123,
    },
  ];

  // 간단 정렬/필터 데모 (실서비스는 서버에서 처리 권장)
  let rows = base.slice();

  if (params.q) {
    const q = params.q.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.intro.toLowerCase().includes(q),
    );
  }

  switch (params.sort) {
    case "리뷰 많은순":
      rows.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "확정 많은순":
      rows.sort((a, b) => b.confirmedCount - a.confirmedCount);
      break;
    case "평점 높은순":
    default:
      rows.sort((a, b) => b.rating - a.rating);
  }

  // UX용 지연 (로딩 상태 확인용) — 실제 서비스에선 제거
  await new Promise((r) => setTimeout(r, 200));

  return rows;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ✅ Next 15: searchParams는 반드시 await 해서 사용
  const sp = await searchParams;
  const { q = "", region, service, sort = "평점 높은순" } = sp;

  // 서버에서 데이터 준비
  const movers = await fetchMovers({ q, region, service, sort });

  return (
    <main className="mx-auto max-w-[1120px] px-6 py-8">
      <h1 className="mb-6 text-lg font-semibold">기사님 찾기</h1>

      {/* 검색 입력 + 필터/정렬 */}
      <section className="mb-6 flex flex-wrap items-center gap-3">
        {/* 검색창 (동작은 추후 연결) */}
        <div className="h-10 min-w-[240px] flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-700">
          <div className="flex h-full items-center">
            <span className="mr-2 text-zinc-400">🔎</span>
            <span className="truncate">
              {q ? `"${q}" 로 검색됨` : "텍스트를 입력해 주세요."}
            </span>
          </div>
        </div>

        {/* 현재 선택된 상태를 보여주는 칩들 */}
        <span className="rounded-full border px-3 py-1 text-sm text-zinc-700">
          지역: {region ?? "전체"}
        </span>
        <span className="rounded-full border px-3 py-1 text-sm text-zinc-700">
          서비스: {service ?? "전체"}
        </span>

        {/* 정렬 드롭다운 (2/3번 캡처처럼) */}
        <SortMenu />
      </section>

      {/* 결과 리스트 */}
      <section className="flex flex-col gap-4">
        {movers.map((m) => (
          <CardHeaderMover
            key={m.id}
            driverName={m.name}
            description={m.intro}
            rating={m.rating}
            reviewCount={m.reviewCount}
            careerYears={m.careerYears}
            confirmedCount={m.confirmedCount}
            className="[&>*:last-child]:hidden" // ✅ 가격 섹션 숨기기(팀원 컴포넌트 수정 없이 사용)
          />
        ))}

        {movers.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
            조건에 맞는 기사님을 찾지 못했어요.
          </div>
        )}
      </section>
    </main>
  );
}
