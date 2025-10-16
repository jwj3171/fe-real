"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useRequestsTabStore,
  type RequestsTab,
} from "@/store/moveRequestTabStore";

const isTab = (v: string | null): v is RequestsTab =>
  v === "normal" || v === "direct";

export function useMoveRequestTab() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { tab, setTab } = useRequestsTabStore();

  const urlTab = isTab(sp.get("type"))
    ? (sp.get("type") as RequestsTab)
    : undefined;

  useEffect(() => {
    if (urlTab && urlTab !== tab) setTab(urlTab);
  }, [urlTab]);

  const onTabChange = (t: RequestsTab, opts?: { stayOnPath?: boolean }) => {
    if (t === tab) return;
    setTab(t);
    if (!opts?.stayOnPath) {
      router.replace(`/requests?type=${t}`);
      return;
    }
    const next = new URLSearchParams(sp);
    next.set("type", t);
    router.replace(`${pathname}?${next.toString()}`);
  };

  return { tab, onTabChange };
}
