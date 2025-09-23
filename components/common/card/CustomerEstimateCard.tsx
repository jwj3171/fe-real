import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import CardPrice from "./CardPrice";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface CustomerEstimateCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
  children?: React.ReactNode;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function CustomerEstimateCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
  children,
  chips = [],
}: CustomerEstimateCardProps) {
  return (
    <Card className={`w-md space-y-5 ${className || ""}`}>
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

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="font-bold text-sm">견적 금액</span>
        <CardPrice amount={price} className="" showLabel={false} />
      </div>

      {children && <>{children}</>}
    </Card>
  );
}
