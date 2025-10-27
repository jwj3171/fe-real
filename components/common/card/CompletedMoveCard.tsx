import CustomerEstimateCard from "./CustomerEstimateCard";
import { Buttons } from "../button";
import Link from "next/link";

interface CompletedMoveCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  moveType: string;
  requestType: string;
  price: number;
  className?: string;
  chips?: {
    label: string;
    iconSrc: string;
  }[];
  quoteId: number | null;
}

export default function CompletedMoveCard({
  customerName,
  from,
  to,
  movingDate,
  moveType,
  requestType,
  price,
  className,
  chips,
  quoteId,
}: CompletedMoveCardProps) {
  return (
    <CustomerEstimateCard
      customerName={customerName}
      from={from}
      to={to}
      movingDate={movingDate}
      moveType={moveType}
      requestType={requestType}
      price={price}
      className={`relative ${className || ""}`}
      chips={chips}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 rounded-xl bg-black/50 text-white">
        <p className="text-lg font-semibold">채택된 견적이에요</p>
        <Link href={`/sentEstimates/${quoteId}`}>
          <Buttons
            variant="outline"
            size="figma"
            state="active"
            className="rounded-lg border border-red-400 bg-white px-4 py-2 text-red-500"
          >
            견적 상세보기
          </Buttons>
        </Link>
      </div>
    </CustomerEstimateCard>
  );
}
