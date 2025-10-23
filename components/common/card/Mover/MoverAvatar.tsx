// components/common/card/Mover/MoverAvatar.tsx
import Image from "next/image";
import { useEffect, useState } from "react";

interface MoverAvatarProps {
  avatarUrl?: string;
  size?: number;
  className?: string;
}

export default function MoverAvatar({
  avatarUrl,
  size = 60,
  className,
}: MoverAvatarProps) {
  const fallback = "/assets/profile.svg";
  const [src, setSrc] = useState(avatarUrl || fallback);

  useEffect(() => {
    setSrc(avatarUrl || fallback);
  }, [avatarUrl]);

  return (
    <div className="aspect-square h-full">
      <Image
        src={src}
        alt="기사님 프로필"
        width={size}
        height={size}
        className={`rounded-lg object-cover ${className || ""}`}
        onError={() => setSrc(fallback)}
      />
    </div>
  );
}
