"use client";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMyActive, useMyClosed } from "@/lib/queries/myRequests";
import MyRequestCard from "@/components/common/card/MyRequestCard";
import { Tabs } from "@/components/common/tab/Tabs";
import { useEstimatesTabStore, type TabValue } from "@/store/estimatesTabStore";

export default function MyEstimatesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const urlTab = (sp.get("tab") as TabValue) ?? "active";
  const { tab, setTab } = useEstimatesTabStore();

  useEffect(() => {
    if (urlTab !== tab) setTab(urlTab);
  }, [urlTab]);

  const onTabChange = (t: TabValue) => {
    if (t === tab) return;
    setTab(t);
    const params = new URLSearchParams(sp);
    params.set("tab", t);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const { data: active, isPending: p1, error: e1 } = useMyActive();
  const { data: closedRaw, isPending: p2, error: e2 } = useMyClosed();

  const confirmed = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "COMPLETED"),
    [closedRaw],
  );
  const expired = useMemo(
    () => (closedRaw ?? []).filter((r) => r.status === "FINISHED"),
    [closedRaw],
  );

  const list =
    tab === "active" ? active : tab === "confirmed" ? confirmed : expired;
  const pending = tab === "active" ? p1 : p2;
  const error = tab === "active" ? e1 : e2;

  return (
    <div className="space-y-4 p-6">
      <Tabs
        value={tab}
        onChange={setTab}
        labels={{
          active: "대기 중",
          confirmed: "확정됨",
          expired: "기한 만료",
        }}
        counts={{
          active: active?.length ?? 0,
          confirmed: confirmed.length,
          expired: expired.length,
        }}
      />

      {pending && <div>로딩…</div>}
      {error && (
        <div className="text-red-600">에러: {(error as any).message}</div>
      )}

      {!pending && !error && (
        <div className="grid gap-3">
          {list?.map((req) => (
            <MyRequestCard key={req.id} req={req} />
          ))}
          {!list?.length && (
            <div className="text-gray-500">
              {tab === "active" && "대기 중인 이사 요청이 없습니다."}
              {tab === "confirmed" && "확정된 이사 요청이 없습니다."}
              {tab === "expired" && "기한이 지나 종료된 요청이 없습니다."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
