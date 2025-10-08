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
  img?: string | null; // 목록엔 img / 상세엔 avatarUrl 등 다를 수 있어 optional
  avatarUrl?: string | null;
  nickname?: string; // 백엔드 예시는 nickname
  name?: string; // 팀 카드에서 name을 쓰고 있어 둘 다 허용
  intro?: string | null; // 소개 문구
  introduction?: string | null;
  description?: string | null;
  averageRating?: number; // 평균 평점
  rating?: number; // 팀 카드가 rating을 쓰면 이것도 허용
  _count?: { reviews: number; quotes: number; likes: number };
  reviews?: number; // 카드에서 직접 표시하는 숫자 호환
  confirmedCount?: number; // quotes 대체 필드 호환
  totalMoves?: number; // (있을 경우 표시)
  services?: ServiceType[]; // 카드 뱃지
  regions?: Region[]; // 카드 뱃지
};

export type MoversListParams = {
  q?: string;
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

/**
 * 기사 목록 조회
 * - 서버가 배열만 주면 → { items } 로 감싸서 반환
 * - 서버가 { items, page, totalPages } 주면 그대로 사용
 */
export async function getMoverList(
  params: MoversListParams,
): Promise<MoversListPage> {
  const res = await axios.get(ROOT, { params });
  const data = res.data;

  if (Array.isArray(data)) {
    return {
      items: data,
      page: params.page ?? 1,
      perPage: params.perPage,
      totalPages: undefined,
    };
  }
  // 백엔드에서 _count 없는 숫자 필드만 줄 수도 있으니 아이템 정규화(선택)
  return {
    items: data.items ?? data,
    page: data.page ?? params.page ?? 1,
    perPage: data.perPage,
    totalPages: data.totalPages,
    total: data.total,
  };
}

/** 상세 (필요 시) */
export async function getMoverDetail(id: number | string) {
  const res = await axios.get(`${ROOT}/${id}`);
  return res.data;
}

/** 좋아요 Top3 (로그인 필요) */
export async function getTopLikedMovers(): Promise<Mover[]> {
  const res = await axios.get(`${ROOT}/likes`);
  const data = res.data;
  return Array.isArray(data) ? data : (data.items ?? []);
}
