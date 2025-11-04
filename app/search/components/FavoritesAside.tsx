"use client";

import Image from "next/image";
import Link from "next/link";

const SERVICE_LABELS: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

type Fav = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  badge?: string;
  rating?: number;
  moves?: number;
  confirmed?: number;
};

export default function FavoritesAside({ items }: { items: Fav[] }) {
  return (
    <div className="mt-[24px] rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900">찜한 기사님</h3>

      {(!items || items.length === 0) && (
        <div className="rounded-lg border border-dashed border-zinc-200 p-6 text-center text-sm text-zinc-500">
          아직 찜한 기사님이 없어요
        </div>
      )}

      {items?.length > 0 && (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id}>
              <Link
                href={`/movers/${m.id}`}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={m.avatarUrl || "/assets/profile_mover_detail.svg"}
                    alt={m.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    {m.badge && (
                      <span
                        className="rounded-md border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-500"
                        title={SERVICE_LABELS[m.badge] ?? m.badge}
                      >
                        {SERVICE_LABELS[m.badge] ?? m.badge}
                      </span>
                    )}
                    <span className="truncate text-sm font-semibold text-zinc-900">
                      {m.name} 기사님
                    </span>
                  </div>
                  <p className="truncate text-xs text-zinc-500">{m.title}</p>

                  <div className="text-#000 mt-1 flex items-center gap-2 text-[11px]">
                    {typeof m.rating === "number" && (
                      <span>⭐ {m.rating.toFixed(1)} </span>
                    )}
                    {typeof m.moves === "number" && <span> | {m.moves}건</span>}
                    {typeof m.confirmed === "number" && (
                      <span> | 확정 {m.confirmed}건</span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
