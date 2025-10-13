"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEstimatesTabStore, type TabValue } from "@/store/estimatesTabStore";

const isTab = (v: string | null): v is TabValue =>
  v === "active" || v === "confirmed" || v === "expired";

export function useEstimatesTab() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const raw = sp.get("tab");
  const urlTab = isTab(raw) ? (raw as TabValue) : undefined;
  const { tab, setTab } = useEstimatesTabStore();

  useEffect(() => {
    if (urlTab && urlTab !== tab) setTab(urlTab);
  }, [urlTab]);

  const onTabChange = (t: TabValue, opts?: { stayOnPath?: boolean }) => {
    if (t === tab) return;
    setTab(t);

    if (!opts?.stayOnPath) {
      router.replace(`/myEstimates?tab=${t}`);
      return;
    }

    const next = new URLSearchParams(sp);
    next.set("tab", t);
    router.replace(`${pathname}?${next.toString()}`);
  };

  return { tab, onTabChange };
}
