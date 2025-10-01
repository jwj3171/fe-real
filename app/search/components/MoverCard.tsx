"use client";

import Image from "next/image";
import Link from "next/link";
import type { Mover } from "@/lib/api/mover";

export default function MoverCard({ mover }: { mover: Mover }) {
  const name = mover.nickname || mover.name || `mover#${mover.id}`;
  const intro = mover.intro ?? mover.introduction ?? mover.description ?? "";
  const img = mover.img ?? mover.avatarUrl ?? "";

  const rating =
    typeof mover.averageRating === "number"
      ? mover.averageRating
      : (mover.rating ?? 0);
  const reviews = mover._count?.reviews ?? mover.reviews ?? 0;
  const quotes = mover._count?.quotes ?? mover.confirmedCount ?? 0;

  return (
    <Link
      href={`/movers/${mover.id}`}
      className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm"
    >
      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-zinc-100">
        {img ? (
          // 외부 도메인이면 next.config.js에 images.domains 추가
          <img src={img} alt={name} className="h-full w-full object-cover" />
        ) : (
          <Image
            src="/assets/profile_mover_detail.svg"
            alt="avatar"
            width={64}
            height={64}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-semibold text-zinc-900">{name}</div>
        {intro && (
          <div className="mt-1 line-clamp-2 text-sm text-zinc-600">{intro}</div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {(mover.services ?? []).map((s) => (
            <span
              key={s}
              className="rounded-md border px-2 py-1 text-xs text-zinc-600"
            >
              {s}
            </span>
          ))}
          {(mover.regions ?? []).map((r) => (
            <span
              key={r}
              className="rounded-md border px-2 py-1 text-xs text-zinc-600"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="w-[120px] text-right text-sm text-zinc-600">
        ★ {rating?.toFixed?.(1) ?? rating} / 리뷰 {reviews}
        <br />
        확정 {quotes}건
      </div>
    </Link>
  );
}
