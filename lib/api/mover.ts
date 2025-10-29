import axios from "@/lib/api/axiosClient.client";

export type Region =
  | "서울"
  | "경기"
  | "인천"
  | "부산"
  | "대전"
  | "대구"
  | "광주"
  | "울산"
  | "세종"
  | "강원"
  | "충북"
  | "충남"
  | "전북"
  | "전남"
  | "경북"
  | "경남"
  | "제주";

export type ServiceType = "SMALL" | "FAMILY" | "OFFICE";
export type SortBy = "reviews" | "rating" | "career" | "quotes";

export type Mover = {
  id: number;
  img?: string | null;
  avatarUrl?: string | null;
  nickname?: string;
  name?: string;
  intro?: string | null;
  introduction?: string | null;
  description?: string | null;
  averageRating?: number;
  rating?: number;
  _count?: { reviews: number; quotes: number; likes: number };
  reviews?: number;
  confirmedCount?: number;
  totalMoves?: number;
  /** 표준화된 서비스/지역 */
  services?: ServiceType[];
  regions?: Region[];
};

export type MoversListParams = {
  q?: string; // UI 키워드
  region?: Region | string;
  serviceType?: ServiceType | string;
  sortBy?: SortBy | string;
  page?: number;
  perPage?: number;
};

export type MoversListPage = {
  items: Mover[];
  page: number;
  perPage?: number;
  totalPages?: number;
  total?: number;
};

const ROOT = "/mover";

/* ------------------------ helpers ------------------------ */
function compact<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out as Partial<T>;
}

function pickServices(item: any): ServiceType[] {
  // 1) 이미 표준 services가 있으면 사용
  if (Array.isArray(item?.services)) return item.services as ServiceType[];
  // 2) 서버가 주는 moverServiceTypes에서 추출
  if (Array.isArray(item?.moverServiceTypes)) {
    return item.moverServiceTypes
      .map((s: any) => (typeof s === "string" ? s : s?.serviceType))
      .filter(Boolean) as ServiceType[];
  }
  // 3) 문자열로 올 때(드물지만) 방어
  if (typeof item?.serviceType === "string") {
    return [item.serviceType as ServiceType];
  }
  return [];
}

function pickRegions(item: any): Region[] {
  if (Array.isArray(item?.regions)) return item.regions as Region[];
  if (Array.isArray(item?.moverRegions)) {
    return item.moverRegions
      .map((r: any) => (typeof r === "string" ? r : r?.region))
      .filter(Boolean) as Region[];
  }
  return [];
}

/** 리스트 아이템 정규화(칩/카운트 포함) */
function normalizeMover(item: any): Mover {
  const _count =
    item?._count ??
    ({
      reviews: Number(item?.reviews ?? 0),
      quotes: Number(item?.quotes ?? item?.confirmedCount ?? 0),
      likes: Number(item?.likes ?? 0),
    } as Mover["_count"]);

  return {
    id: Number(item.id),
    img: item.img ?? null,
    avatarUrl: item.avatarUrl ?? null,
    nickname: item.nickname ?? item.name ?? undefined,
    name: item.name ?? item.nickname ?? undefined,
    intro: item.intro ?? item.introduction ?? null,
    introduction: item.introduction ?? item.intro ?? null,
    description: item.description ?? null,
    averageRating:
      item.averageRating ?? (typeof item.rating === "number" ? item.rating : 0),
    rating: item.rating ?? item.averageRating ?? 0,
    _count,
    reviews: Number(item.reviews ?? _count?.reviews ?? 0),
    confirmedCount: Number(
      item.confirmedCount ?? _count?.quotes ?? item.quotes ?? 0,
    ),
    totalMoves: item.totalMoves,
    services: pickServices(item), // ★ moverServiceTypes → services 표준화
    regions: pickRegions(item), // ★ moverRegions → regions 표준화
  };
}

/* ------------------------- APIs ------------------------- */
/**
 * 기사 목록 조회
 * - UI의 q를 서버 명세 searchText로 매핑
 * - 배열/객체 응답 모두 안전 처리
 */
export async function getMoverList(
  params: MoversListParams,
): Promise<MoversListPage> {
  const query = compact({
    searchText: params.q, // ★ 핵심 매핑
    region: params.region,
    serviceType: params.serviceType,
    sortBy: params.sortBy,
    page: params.page ?? 1,
    perPage: params.perPage ?? 10,
  });

  const res = await axios.get(ROOT, { params: query });
  const data = res.data;

  if (Array.isArray(data)) {
    return {
      items: data.map(normalizeMover),
      page: params.page ?? 1,
      perPage: params.perPage,
      totalPages: undefined,
      total: undefined,
    };
  }

  const items = Array.isArray(data?.items) ? data.items : data;
  return {
    items: items.map(normalizeMover),
    page: Number(data?.page ?? params.page ?? 1),
    perPage: Number(data?.perPage ?? params.perPage ?? 10),
    totalPages: data?.totalPages != null ? Number(data.totalPages) : undefined,
    total: data?.total != null ? Number(data.total) : undefined,
  };
}

/** 기사 상세 */
export async function getMoverDetail(id: number | string) {
  const res = await axios.get(`${ROOT}/${id}`);
  return res.data;
}

/** 좋아요 Top3 */
export async function getTopLikedMovers(): Promise<Mover[]> {
  const res = await axios.get(`${ROOT}/likes`);
  const data = res.data;
  const list = Array.isArray(data) ? data : (data?.items ?? []);
  return list.map(normalizeMover);
}
