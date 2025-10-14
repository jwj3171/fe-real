"use client";
import { useMemo } from "react";
import { MoverTabs } from "@/components/common/tab/MoverTabs";
import { useMoverQuoteTab } from "@/hooks/useMoverQuoteTab";
import {
  useNormalRequests,
  useDirectRequests,
} from "@/lib/queries/moverRequests";

export default function MoveRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tab, onTabChange } = useMoverQuoteTab();

  const normalQ = useNormalRequests({ enabled: tab === "normal" });
  const directQ = useDirectRequests({ enabled: tab === "direct" });

  const normalCount = useMemo(
    () => normalQ.data?.pages?.[0]?.meta?.total ?? 0,
    [normalQ.data],
  );
  const directCount = useMemo(
    () => directQ.data?.meta?.total ?? 0,
    [directQ.data],
  );

  return (
    <div className="space-y-4 p-6">
      <MoverTabs
        value={tab}
        onChange={(t) => onTabChange(t)}
        counts={{ normal: normalCount, direct: directCount }}
      />
      {children}
    </div>
  );
}
