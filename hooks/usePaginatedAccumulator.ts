// hooks/usePaginatedAccumulator.ts
import { useCallback, useEffect, useState, type RefObject } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type UsePaginatedAccumulatorParams<T> = {
  page: number;
  pageSize: number;
  pageItems: T[] | undefined;
  isLoading: boolean;
  onChangePage: (p: number) => void;
  getKey: (item: T) => string;
  enabled?: boolean;
};

type UsePaginatedAccumulatorReturn<T> = {
  acc: T[];
  isEnd: boolean;
  observerRef: RefObject<HTMLDivElement | null>;
  loadMore: () => void;
  reset: () => void;
};

export default function usePaginatedAccumulator<T>({
  page,
  pageSize,
  pageItems,
  isLoading,
  onChangePage,
  getKey,
  enabled = true,
}: UsePaginatedAccumulatorParams<T>): UsePaginatedAccumulatorReturn<T> {
  const [acc, setAcc] = useState<T[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!enabled || !pageItems) return;

    if (page === 1) {
      setAcc(pageItems);
      setIsEnd((pageItems?.length ?? 0) < pageSize);
    } else {
      setAcc((prev) => {
        const next = [...prev, ...pageItems];
        const seen = new Set<string>();
        return next.filter((it) => {
          const k = getKey(it);
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
      });
      if ((pageItems?.length ?? 0) < pageSize) setIsEnd(true);
    }
  }, [enabled, pageItems, page, pageSize, getKey]);

  const loadMore = useCallback(() => {
    if (!enabled) return;
    if (!isLoading && !isEnd && (pageItems?.length ?? 0) >= pageSize) {
      onChangePage(page + 1);
    }
  }, [enabled, isLoading, isEnd, pageItems, pageSize, onChangePage, page]);

  const observerRef = useInfiniteScroll(loadMore, enabled && !isEnd);

  const reset = useCallback(() => {
    setAcc([]);
    setIsEnd(false);
  }, []);

  return { acc, isEnd, observerRef, loadMore, reset };
}
