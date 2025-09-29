import Card from "./Card";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverDescription from "./Mover/MoverDescription";
import MoverStats from "./Mover/MoverStats";
import MoverMessage from "./Mover/MoverMessage";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";
import { Buttons } from "../button";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface WaitingRequestCardProps {
  driverName: string;
  description: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  price: number;
  comment: string;
  likeCount: number;
  moveType: string;
  requestType: string;
  className?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function WaitingRequestCard({
  driverName,
  description,
  avatarUrl,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  price,
  comment,
  likeCount,
  moveType,
  requestType,
  className,
  chips = [],
}: WaitingRequestCardProps) {
  return (
    <Card className={`w-md space-y-4 ${className || ""}`}>
      <div className="space-y-3">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, idx) => (
              <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
                {chip.label}
              </ServiceChip>
            ))}
          </div>
        )}
      </div>
      <MoverMessage message={comment} />
      <div className="flex items-center gap-3">
        <MoverAvatar avatarUrl={avatarUrl} size={48} />
        <div>
          <MoverName MoverName={driverName} />
          <MoverStats
            rating={rating}
            reviewCount={reviewCount}
            careerYears={careerYears}
            confirmedCount={confirmedCount}
            className="mt-1"
          />
        </div>
        <LikeCounter count={likeCount} className="ml-auto" />
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <span className="text-sm text-gray-500">견적 금액</span>
        <CardPrice amount={price} showLabel={false} />
      </div>
      <div className="flex gap-3 pt-3">
        <Buttons
          variant="outline"
          size="figma"
          state="active"
          className="w-1/2"
        >
          상세보기
        </Buttons>
        <Buttons size="figma" className="w-1/2">
          견적 확정하기
        </Buttons>
      </div>
    </Card>
  );
}
