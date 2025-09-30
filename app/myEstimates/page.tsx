"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMyActive, useMyClosed } from "@/lib/queries/myRequests";
import MyRequestCard from "@/components/common/card/MyRequestCard";
import { Tabs } from "@/components/common/tab/Tabs";

type TabValue = "active" | "closed";

export default function MyEstimatesPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const tab = (sp.get("tab") as "active" | "closed") ?? "active";

  const { data: active, isPending: p1, error: e1 } = useMyActive();
  const { data: closed, isPending: p2, error: e2 } = useMyClosed();

  const setTab = (t: TabValue) => {
    const params = new URLSearchParams(sp);
    t === "closed" ? params.set("tab", "closed") : params.delete("tab");
    router.replace(`/myEstimates?${params.toString()}`);
  };

  const list = tab === "active" ? active : closed;
  const pending = tab === "active" ? p1 : p2;
  const error = tab === "active" ? e1 : e2;

  return (
    <div className="space-y-4 p-6">
      <Tabs value={tab} onChange={setTab} />

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
            <div className="text-gray-500">리스트가 비어 있습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
