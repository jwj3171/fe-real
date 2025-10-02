import Card from "./Card";
import MoverMessage from "./Mover/MoverMessage";
import MoverAvatar from "./Mover/MoverAvatar";
import MoverName from "./Mover/MoverName";
import MoverStats from "./Mover/MoverStats";
import LikeCounter from "./Mover/LikeCounter";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";
import EstimateStatus from "./EstimateStatus";

type ServiceType = "SMALL" | "FAMILY" | "OFFICE";
type QuoteType = "NORMAL" | "DIRECT";
interface EstimateHistoryCardProps {
  message: string;
  driverName: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  careerYears: number;
  confirmedCount: number;
  liked: number;
  price: number;
  className?: string;
  status: "confirmed" | "waiting";
  serviceType?: ServiceType;
  quoteType?: QuoteType;
}

const serviceChipMap: Record<ServiceType, { label: string; icon: string }> = {
  SMALL: { label: "소형이사", icon: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", icon: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", icon: "/icons/ic_company.svg" },
};

const quoteTypeMap: Record<QuoteType, { label: string; icon: string }> = {
  NORMAL: { label: "일반 견적", icon: "/icons/ic_document.svg" },
  DIRECT: { label: "지정 견적 요청", icon: "/icons/ic_document.svg" },
};

export default function EstimateHistoryCard({
  message,
  driverName,
  avatarUrl,
  rating,
  reviewCount,
  careerYears,
  confirmedCount,
  liked,
  price,
  className,
  status,
  serviceType,
  quoteType,
}: EstimateHistoryCardProps) {
  const svc = serviceType ? serviceChipMap[serviceType] : null;
  const qt = quoteType ? quoteTypeMap[quoteType] : null;

  return (
    <Card className={`w-md space-y-4 border-none ${className || ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        {svc && (
          <ServiceChip iconSrc={svc.icon} size="sm">
            {svc.label}
          </ServiceChip>
        )}
        {qt && (
          <ServiceChip iconSrc={qt.icon} size="sm">
            {qt.label}
          </ServiceChip>
        )}
        <EstimateStatus
          status={status}
          className={status === "waiting" ? "ml-19" : "ml-13"}
        />
      </div>

      <MoverMessage message={message} />

      <div className="flex items-center justify-between rounded-xl border border-gray-300 px-4 py-3">
        <div className="flex items-center gap-3">
          <MoverAvatar avatarUrl={avatarUrl} size={40} />
          <div>
            <MoverName MoverName={driverName} className="text-sm" />
            <MoverStats
              rating={rating}
              reviewCount={reviewCount}
              careerYears={careerYears}
              confirmedCount={confirmedCount}
              className="mt-1"
            />
          </div>
        </div>
        <LikeCounter count={liked} className="mb-6" />
      </div>

      <div className="flex items-center justify-end pt-3">
        <CardPrice amount={price} />
      </div>
    </Card>
  );
}
