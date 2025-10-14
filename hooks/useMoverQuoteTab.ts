"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useMoverQuoteTabStore,
  type MoverTab,
} from "@/store/moverQuoteTabStore";

const isTab = (v: string | null): v is MoverTab =>
  v === "normal" || v === "direct";

export function useMoverQuoteTab() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { tab, setTab } = useMoverQuoteTabStore();

  const urlTab = isTab(sp.get("type"))
    ? (sp.get("type") as MoverTab)
    : undefined;

  useEffect(() => {
    if (urlTab && urlTab !== tab) setTab(urlTab);
  }, [urlTab]);

  const onTabChange = (t: MoverTab, opts?: { stayOnPath?: boolean }) => {
    if (t === tab) return;
    setTab(t);
    if (!opts?.stayOnPath) {
      router.replace(`/myQuote?type=${t}`);
      return;
    }
    const next = new URLSearchParams(sp);
    next.set("type", t);
    router.replace(`${pathname}?${next.toString()}`);
  };

  return { tab, onTabChange };
}
