import { SqureDefaultCheckIcon } from "@/components/common/button/icons";
import Card from "@/components/common/card/Card";
import LikeCounter from "@/components/common/card/Mover/LikeCounter";
import MoverAvatar from "@/components/common/card/Mover/MoverAvatar";
import MoverDescription from "@/components/common/card/Mover/MoverDescription";
import MoverMessage from "@/components/common/card/Mover/MoverMessage";
import MoverName from "@/components/common/card/Mover/MoverName";
import MoverStats from "@/components/common/card/Mover/MoverStats";
import { ServiceChip } from "@/components/common/chip";
import SquareCheckBox from "./SquareCheckBox";
import Link from "next/link";

interface CardMoverCheckableProps {
  moverId: number;
  driverName: string;
  introduction: string;
  description: string;
  avatarUrl?: string;
  className?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  likeCount?: number;
  services?: any[];
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export default function CardMoverCheckable({
  moverId,
  driverName,
  introduction,
  description,
  avatarUrl,
  className,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  likeCount = 0, // 기본값은 0
  services = [],
  checked = false,
  onCheckChange,
}: CardMoverCheckableProps) {
  return (
    <Card className={`w-full space-y-3 pr-7 pl-7 ${className || ""}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <ServiceChip key={service.serviceType} size="sm">
                {service.serviceType}
              </ServiceChip>
            ))}
          </div>
          <SquareCheckBox checked={checked} onChange={onCheckChange} />
        </div>
        <Link href={`/movers/${moverId}`} className="block">
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
        </Link>
      </div>
    </Card>
  );
}
