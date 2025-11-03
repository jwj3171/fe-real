"use client";

import { getMoverLikeCount } from "@/lib/api/likes";
import { useQuery } from "@tanstack/react-query";
import { LikeActiveIcon } from "./common/button/icons";

type Props = { moverId: number };

export default function LikesCount({ moverId }: Props) {
  const { data: likeCount } = useQuery({
    queryKey: ["likes-count", moverId],
    queryFn: () => getMoverLikeCount(moverId),
  });

  return (
    <div className="absolute top-0 right-0 hidden items-center gap-1 text-sm text-zinc-500 md:flex">
      <LikeActiveIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </div>
  );
}
