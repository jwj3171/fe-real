import Card from "./Card";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverDescription from "./Mover/MoverDescription";
import MoverStats from "./Mover/MoverStats";
import MoverMessage from "./Mover/MoverMessage";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";

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
}: CardHeaderMoverProps) {
  console.log(`introduction: ${introduction} description: ${description}`);
  return (
    <Card className={`w-full space-y-3 ${className || ""}`}>
      <div className="flex items-center gap-3 pb-2">
        <MoverAvatar size={80} />
        <div className="flex flex-col gap-y-2">
          <div>
            <MoverMessage message={introduction} />
            <MoverDescription description={description} />
          </div>

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
        </div>
        <LikeCounter count={likeCount} className="mt-2 ml-8" />{" "}
      </div>
      {showPrice && <CardPrice amount={180000} className="mt-4 justify-end" />}
    </Card>
  );
}
