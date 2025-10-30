interface CardPriceProps {
  amount: number;
  showLabel?: boolean;
  className?: string;
}

export default function CardPrice({
  amount,
  className,
  showLabel = true,
}: CardPriceProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {showLabel && (
        <span className="text-[14px] text-gray-500 sm:text-[16px]">
          견적 금액
        </span>
      )}
      <span className="text-[20px] font-bold text-black sm:text-[24px]">
        {amount.toLocaleString()}원
      </span>
    </div>
  );
}
