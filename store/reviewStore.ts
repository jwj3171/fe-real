"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Sort = "recent" | "helpful" | "ratingDesc" | "ratingAsc";
type S = {
  rating: number | null;
  sort: Sort;
  setRating: (r: number | null) => void;
  setSort: (s: Sort) => void;
  reset: () => void;
};

export const useReviewStore = create<S>()(
  persist(
    (set) => ({
      rating: null,
      sort: "recent",
      setRating: (rating) => set({ rating }),
      setSort: (sort) => set({ sort }),
      reset: () => set({ rating: null, sort: "recent" }),
    }),
    { name: "review-ui" }
  )
);
