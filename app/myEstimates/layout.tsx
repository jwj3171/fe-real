"use client";

import { useMemo } from "react";
import { Tabs } from "@/components/common/tab/Tabs";
import { useMyActive, useMyClosed } from "@/lib/queries/myRequests";
import { useEstimatesTab } from "@/hooks/useEstimatesTab";

export default function MyEstimatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tab, onTabChange } = useEstimatesTab();
  const { data: active } = useMyActive();
  const { data: closedRaw } = useMyClosed();

  const confirmed = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "COMPLETED"),
    [closedRaw],
  );
  const expired = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "FINISHED"),
    [closedRaw],
  );

  return (
    <div className="mx-auto max-w-[1120px] space-y-6 p-2 sm:p-8">
      <Tabs
        value={tab}
        onChange={(t) => onTabChange(t)}
        labels={{
          active: "대기 견적",
          confirmed: "확정 견적",
          expired: "만료 견적",
        }}
        counts={{
          active: active?.length ?? 0,
          confirmed: confirmed.length,
          expired: expired.length,
        }}
      />
      {children}
    </div>
  );
}
