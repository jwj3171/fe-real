export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
const MOCK = process.env.NEXT_PUBLIC_MOCK === "1";

export type Mover = {
  id: string;
  name: string;
  intro: string;
  avatarUrl: string;
  likes: number;
  careerYears: number;
  totalMoves: number;
  rating: number;
  providedServices: string[];
  regions: string[];
};
export type Review = {
  id: string;
  nickname: string;
  rating: number;
  createdAt: string;
  content: string;
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

import { mockGetMover, mockGetMoverReviewsByPage } from "./moverMock";

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getMover(moverId: string) {
  if (MOCK) return mockGetMover(moverId);
  return json<Mover>(`${API_BASE}/movers/${moverId}`, {
    cache: "force-cache",
    next: { revalidate: 60, tags: [`mover:${moverId}`] },
  });
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
  if (MOCK) return mockGetMoverReviewsByPage(moverId, page, limit, opts);
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (opts?.rating) qs.set("rating", String(opts.rating));
  if (opts?.sort) qs.set("sort", opts.sort);
  return json<ReviewsPage>(`${API_BASE}/movers/${moverId}/reviews?${qs}`, {
    cache: "no-store",
  });
}
