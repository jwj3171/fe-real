import Card from "./Card";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverDescription from "./Mover/MoverDescription";
import MoverStats from "./Mover/MoverStats";
import MoverMessage from "./Mover/MoverMessage";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";

const SERVICE_LABELS: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};

interface CardHeaderMoverProps {
  driverName: string;
  introduction: string;
  description: string;
  avatarUrl?: string;
  className?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  showPrice?: boolean;
  likeCount?: number;
  services?: string[];
}

export default function CardHeaderMover({
  driverName,
  introduction,
  description,
  avatarUrl,
  className,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  showPrice = true, // 기본값은 true
  likeCount = 0, // 기본값은 0
  services = [],
}: CardHeaderMoverProps) {
  return (
    <Card className={`w-full space-y-3 pr-7 pl-7 ${className || ""}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <ServiceChip key={service} size="sm">
                {service}
              </ServiceChip>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 pb-2">
          <MoverAvatar size={134} />
          <div className="flex w-full flex-col gap-y-5">
            <div>
              <MoverMessage message={introduction} />
              <MoverDescription description={description} />
            </div>
            <div>
              <div className="flex flex-row items-end justify-between">
                <div>
                  <MoverName MoverName={driverName} className="text-base" />
                  <MoverStats
                    rating={rating}
                    reviewCount={reviewCount}
                    careerYears={careerYears}
                    confirmedCount={confirmedCount}
                    className="mt-1"
                  />
                </div>
                <LikeCounter count={likeCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPrice && <CardPrice amount={180000} className="mt-4 justify-end" />}
    </Card>
  );
}
