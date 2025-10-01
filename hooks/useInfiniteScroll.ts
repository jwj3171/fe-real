// hooks/useInfiniteScroll.ts
import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  callback: () => void,
  enabled: boolean = true,
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [callback, enabled]);

  return observerRef;
}
