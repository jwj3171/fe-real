export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

/** 리뷰 단일 아이템 (백엔드가 name을 내려주되, 하위호환으로 nickname도 허용) */
export type Review = {
  id: string;
  name: string; // 컴포넌트에서 최종 사용
  rating: number;
  createdAt: string; // ISO string
  content: string;
  // (옵션) 디버그/후처리용
  customerId?: number;
};

/** 기사 상세 (name/nickname 둘 다 허용해 호환성 유지) */
export type Mover = {
  id: string;
  name?: string;
  nickname?: string;
  intro?: string;
  avatarUrl?: string;
  likes?: number;
  careerYears?: number;
  rating?: number;
  totalMoves?: number;
  providedServices?: string[];
  regions?: string[];
};

export type ReviewsPage = {
  items: Review[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  avg: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
};

// (옵션) 작성자 공개 프로필 조회용
export type CustomerPublic = {
  id: number;
  name?: string | null;
  nickname?: string | null;
  email?: string | null;
};

// ───────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`);
  return res.json() as Promise<T>;
}

/** 서버 응답을 Review로 정규화(키 이름이 달라도 안전하게 흡수) */
function normalizeReview(raw: any): Review {
  const id = String(raw.id ?? raw.reviewId ?? crypto.randomUUID());

  // 서버가 name을 내려주지만, 혹시 구버전 nickname만 내려오면 그걸로 대체
  const name: string =
    raw.name ??
    raw.nickname ??
    raw.customer?.name ??
    raw.customer?.nickname ??
    raw.user?.name ??
    raw.user?.nickname ??
    "익명";

  // 작성자 id 후보(있으면 보조정보로 보관)
  const customerId: number | undefined =
    raw.customerId ??
    raw.customer?.id ??
    raw.userId ??
    raw.user?.id ??
    undefined;

  const rating = Number(raw.rating ?? raw.score ?? raw.stars ?? 0);

  const createdAt: string =
    raw.createdAt ??
    raw.created_at ??
    raw.createdDate ??
    new Date().toISOString();

  const content: string = raw.content ?? raw.comment ?? raw.body ?? "";

  return { id, name, rating, createdAt, content, customerId };
}

/** 서버의 페이지 응답을 ReviewsPage로 정규화 */
function normalizeReviewsPage(
  raw: any,
  fallback: { page: number; limit: number },
): ReviewsPage {
  const data = raw?.data && typeof raw.data === "object" ? raw.data : raw;

  const rawItems = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
      ? data
      : [];
  const items = rawItems.map(normalizeReview);

  const page = Number(data?.page ?? fallback.page ?? 1);
  const pageSize = Number(
    data?.pageSize ?? data?.limit ?? (items.length || fallback.limit),
  );
  const total = Number(data?.total ?? data?.totalCount ?? items.length);
  const totalPages =
    Number(data?.totalPages ?? data?.pages) ||
    Math.max(1, Math.ceil(total / (pageSize || 1)));

  const avg = Number(data?.avg ?? data?.average ?? 0);
  const breakdown: ReviewsPage["breakdown"] =
    (data?.breakdown as ReviewsPage["breakdown"]) ?? {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

  return { items, page, pageSize, total, totalPages, avg, breakdown };
}

// ───────────────────────────────────────────────────────────
// APIs
// ───────────────────────────────────────────────────────────

export async function getMover(moverId: string) {
  const raw = await json<any>(`${API_BASE}/mover/${moverId}`);
  const node = raw?.data && typeof raw.data === "object" ? raw.data : raw;
  node.name ??= node.nickname ?? `기사 #${moverId}`; // 기본값 보정
  return node as Mover;
}

/** 기사 리뷰 목록(페이지네이션) */
export async function getMoverReviewsByPage(
  moverId: string,
  page = 1,
  limit = 10,
  opts?: {
    rating?: number | null;
    sort?: "recent" | "helpful" | "ratingDesc" | "ratingAsc";
  },
): Promise<ReviewsPage> {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (opts?.rating) qs.set("rating", String(opts.rating));
  if (opts?.sort) qs.set("sort", opts.sort);

  // 팀 규칙에 맞는 경로 사용(여기선 복수형)
  const raw = await json<any>(`${API_BASE}/movers/${moverId}/reviews?${qs}`, {
    cache: "no-store",
  });
  return normalizeReviewsPage(raw, { page, limit });
}

/** (옵션) 고객 공개 프로필 */
export async function getCustomerPublicProfile(id: number) {
  const res = await fetch(`${API_BASE}/customer/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`[${res.status}] /customer/${id}`);
  return (await res.json()) as CustomerPublic;
}
