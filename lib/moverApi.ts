export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export type Mover = {
  id: string;
  nickname: string;
  intro?: string;
  avatarUrl?: string;
  likes?: number;
  careerYears?: number;
  totalMoves?: number;
  rating?: number;
  providedServices?: string[];
  regions?: string[];
};

export type ReviewsPage = {
  items: {
    id: string;
    nickname: string;
    rating: number;
    createdAt: string;
    content: string;
  }[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  avg: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
};

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getMover(moverId: string) {
  const raw = await json<any>(`${API_BASE}/movers/${moverId}`);
  const node = raw?.data && typeof raw.data === "object" ? raw.data : raw;
  node.nickname ??= node.name ?? `기사 #${moverId}`;
  return node as Mover;
}

export async function getMoverReviewsByPage(
  moverId: string,
  page = 1,
  limit = 10,
  opts?: {
    rating?: number | null;
    sort?: "recent" | "helpful" | "ratingDesc" | "ratingAsc";
  },
) {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (opts?.rating) qs.set("rating", String(opts.rating));
  if (opts?.sort) qs.set("sort", opts.sort);
  return json<ReviewsPage>(`${API_BASE}/movers/${moverId}/reviews?${qs}`, {
    cache: "no-store",
  });
}
