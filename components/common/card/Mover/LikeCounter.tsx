import Image from "next/image";

interface LikeCounterProps {
  count: number;
  className?: string;
}

export default function LikeCounter({ count, className }: LikeCounterProps) {
  return (
    <div className={`flex h-fit w-fit items-center gap-0.5 ${className || ""}`}>
      <div className="flex h-6 w-6 items-center justify-center">
        <Image src="/icons/ic_like.svg" alt="좋아요" width={18} height={18} />
      </div>
      <span className="flex h-6 w-6 items-center justify-center text-sm text-gray-600">
        {count}
      </span>
    </div>
  );
}
