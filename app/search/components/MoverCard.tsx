import Image from "next/image";
import Link from "next/link";
import type { Mover } from "../../../lib/MoverSearchApi";
import { Chip } from "@/components/common/chip/Chips";

export default function MoverCard({ mover }: { mover: Mover }) {
  return (
    <Link
      href={`/movers/${mover.id}`}
      className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm"
    >
      <Image
        src={mover.avatarUrl || "/assets/profile_mover_detail.svg"}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-zinc-900">
          {mover.name}
        </div>
        <div className="mt-1 line-clamp-2 text-sm text-zinc-600">
          {mover.intro}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {mover.services.map((s) => (
            <Chip key={s} variant="outline" color="primary" size="sm">
              {s}
            </Chip>
          ))}
          {mover.regions.map((r) => (
            <Chip key={r} variant="outline" color="neutral" size="sm">
              {r}
            </Chip>
          ))}
        </div>
      </div>
      <div className="w-[120px] text-right text-sm text-zinc-600">
        ⭐ {mover.rating} / 리뷰 {mover.reviews}
        <br />
        진행 {mover.totalMoves}건
      </div>
    </Link>
  );
}
