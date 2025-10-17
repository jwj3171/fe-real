// components/common/card/ReviewWriteCard.tsx
"use client";

import Card from "./Card";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import { Buttons } from "../button";
import { ServiceChip } from "../chip";

interface ReviewWriteCardProps {
  moverName: string;
  moverAvatarUrl?: string;
  serviceLabel: string;
  from: string;
  to: string;
  moveDate: string;
  price: number;
  onWrite?: () => void;
  className?: string;
}

export default function ReviewWriteCard({
  moverName,
  moverAvatarUrl,
  serviceLabel,
  from,
  to,
  moveDate,
  price,
  onWrite,
  className,
}: ReviewWriteCardProps) {
  return (
    <Card
      className={`flex flex-col justify-between border border-gray-200 bg-white p-6 shadow-sm ${className || ""}`}
      aria-label="리뷰 작성 카드"
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <MoverAvatar avatarUrl={moverAvatarUrl} size={80} />
          <div>
            <MoverName MoverName={moverName} />
            <p className="mt-1 text-sm text-gray-500">기사 설명 들어가는 곳</p>
            <div className="mt-2">
              <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
                {serviceLabel}
              </ServiceChip>
            </div>
          </div>
        </div>

        <div className="text-right">
          <CardPrice
            amount={price}
            showLabel={true}
            className="flex-col items-end [&>span:first-child]:text-base [&>span:first-child]:font-medium [&>span:first-child]:text-gray-500 [&>span:last-child]:text-3xl [&>span:last-child]:font-bold"
          />
        </div>
      </div>

      <div className="my-4 border-t border-gray-100" />

      <div className="flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-8">
          <CardRouteInfo from={from} to={to} showArrow />
          <CardDateInfo movingDate={moveDate} />
        </div>

        <Buttons size="figma" onClick={onWrite} aria-label="리뷰 작성하기">
          리뷰 작성하기
        </Buttons>
      </div>
    </Card>
  );
}
