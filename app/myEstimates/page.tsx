"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMyActive, useMyClosed } from "@/lib/queries/myRequests";
import Link from "next/link";
import type { MoveRequest } from "@/types/move";

const KRWdate = (s: string) => new Date(s).toLocaleDateString("ko-KR");

function RequestCard({ req }: { req: MoveRequest }) {
  const href = `/myEstimates/${req.id}`;
  return (
    <Link
      href={href}
      className="block rounded-xl border p-4 transition hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
            {req.serviceType}
          </span>
          <span className="text-sm text-gray-500">{req.status}</span>
        </div>
        <span className="text-sm text-gray-500">{KRWdate(req.moveDate)}</span>
      </div>
      <div className="mt-1 text-gray-800">
        {req.departure} ({req.departureRegion}) → {req.destination} (
        {req.destinationRegion})
      </div>
      <div className="mt-1 text-xs text-gray-400">
        등록일 {new Date(req.createdAt).toLocaleString("ko-KR")}
      </div>
    </Link>
  );
}

export default function MyEstimatesPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const tab = (sp.get("tab") as "active" | "closed") ?? "active";

  const { data: active, isPending: p1, error: e1 } = useMyActive();
  const { data: closed, isPending: p2, error: e2 } = useMyClosed();

  const setTab = (t: "active" | "closed") => {
    const params = new URLSearchParams(sp);
    t === "closed" ? params.set("tab", "closed") : params.delete("tab");
    router.replace(`/myEstimates?${params.toString()}`);
  };

  const list = tab === "active" ? active : closed;
  const pending = tab === "active" ? p1 : p2;
  const error = tab === "active" ? e1 : e2;

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("active")}
          className={`rounded px-3 py-1 ${tab === "active" ? "bg-black text-white" : "bg-gray-100"}`}
        >
          진행중
        </button>
        <button
          onClick={() => setTab("closed")}
          className={`rounded px-3 py-1 ${tab === "closed" ? "bg-black text-white" : "bg-gray-100"}`}
        >
          종료됨
        </button>
      </div>

      {pending && <div>로딩…</div>}
      {error && (
        <div className="text-red-600">에러: {(error as any).message}</div>
      )}

      {!pending && !error && (
        <div className="grid gap-3">
          {list?.map((req) => (
            <RequestCard key={req.id} req={req} />
          ))}
          {!list?.length && (
            <div className="text-gray-500">리스트가 비어 있습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
