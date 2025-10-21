// lib/moverApi.ts (또는 reviewApi.ts)
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

/** 리뷰 단일 아이템 (닉네임/고객ID는 백엔드 상황에 따라 옵셔널) */
export type Review = {
  id: string;
  nickname?: string | null; // 서버가 바로 줄 수도 있고 없을 수도 있음
  customerId?: number; // 서버가 주는 경우가 많음
  rating: number;
  createdAt: string; // ISO string
  content: string;
};

export type Mover = {
  id: string;
  nickname: string;
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

// (옵션) 작성자 공개 프로필 조회용 타입/함수 — 닉네임 보완할 때 사용
export type CustomerPublic = {
  id: number;
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

/** 서버의 다양한 키를 받아 Review로 정규화 */
function normalizeReview(raw: any): Review {
  const id = String(raw.id ?? raw.reviewId ?? crypto.randomUUID());

  // 닉네임 후보들: 직접 필드 → customer 객체 → (없으면 null)
  const nickname =
    raw.nickname ?? raw.customer?.nickname ?? raw.user?.nickname ?? null;

  // 작성자 id 후보들
  const customerId: number | undefined =
    raw.customerId ??
    raw.customer?.id ??
    raw.userId ??
    raw.user?.id ??
    undefined;

  // 평점/날짜/본문 후보들
  const rating = Number(raw.rating ?? raw.score ?? raw.stars ?? 0);

  const createdAt: string =
    raw.createdAt ??
    raw.created_at ??
    raw.createdDate ??
    new Date().toISOString();

  const content: string = raw.content ?? raw.comment ?? raw.body ?? "";

  return { id, nickname, customerId, rating, createdAt, content };
}

/** 서버의 페이지 응답을 ReviewsPage로 정규화 */
function normalizeReviewsPage(
  raw: any,
  fallback: { page: number; limit: number },
): ReviewsPage {
  // 어떤 서버는 { data: {...} }로 싸서 줄 수 있음
  const data = raw?.data && typeof raw.data === "object" ? raw.data : raw;

  const rawItems = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
      ? data
      : [];
  const items = rawItems.map(normalizeReview);

  const page = Number(data?.page ?? fallback.page ?? 1);
  const pageSize = Number(
    data?.pageSize ?? data?.limit ?? items.length ?? fallback.limit,
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
  node.nickname ??= node.name ?? `기사 #${moverId}`;
  return node as Mover;
}

/**
 * 기사 리뷰 목록(페이지네이션)
 * - 서버 응답 모양이 달라도 normalize 해서 ReviewsPage로 맞춰서 반환
 * - 백엔드 경로가 단수/복수 중 무엇인지 팀 규칙에 맞춰 아래 경로만 확인
 */
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

  // ⚠️ 백엔드가 /mover/{id}/reviews 인지 /movers/{id}/reviews 인지 팀 규칙에 맞춰 하나만 사용
  const url = `${API_BASE}/movers/${moverId}/reviews?${qs}`; // ← 지금 네 코드와 동일

  const raw = await json<any>(url, { cache: "no-store" });
  return normalizeReviewsPage(raw, { page, limit });
}

/** (옵션) 고객 공개 프로필: customerId로 닉네임 보완이 필요할 때 사용 */
export async function getCustomerPublicProfile(id: number) {
  // 팀 백엔드 라우트에 맞게 경로 수정 가능: /customer/{id}, /customers/{id} 등
  const res = await fetch(`${API_BASE}/customer/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`[${res.status}] /customer/${id}`);
  return (await res.json()) as CustomerPublic;
}
