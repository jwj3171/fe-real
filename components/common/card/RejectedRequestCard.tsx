import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface RejectedRequestCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function RejectedRequestCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
  chips = [],
}: RejectedRequestCardProps) {
  return (
    <Card className={`w-md space-y-5 relative ${className || ""}`}>
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

      <CardHeaderCustomer customerName={customerName} />

      <div className="flex justify-between text-sm font-bold">
        <CardRouteInfo from={from} to={to} />
        <CardDateInfo movingDate={movingDate} />
      </div>

      {/* 반려 오버레이 */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl text-white">
        <p className="text-lg font-semibold">반려된 요청이에요</p>
      </div>
    </Card>
  );
}
