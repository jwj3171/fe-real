import React from "react";

interface CardRouteInfoProps {
  from: string;
  to: string;
  showArrow?: boolean;
  className?: string;
}

export default function CardRouteInfo({
  from,
  to,
  showArrow = true,
  className = "",
}: CardRouteInfoProps) {
  return (
    <div className={`mt-1 flex gap-5 font-bold ${className}`}>
      <div className="flex flex-col items-start">
        <p className="text-sm text-gray-400">출발지</p>
        <p className="font-bold">{from}</p>
      </div>

      {showArrow && <div className="mt-5 flex items-center">→</div>}

      <div className="flex flex-col items-start">
        <p className="text-sm text-gray-400">도착지</p>
        <p className="font-bold">{to}</p>
      </div>
    </div>
  );
}
