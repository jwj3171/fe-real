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
    <div className={`flex gap-5 mt-1 font-bold ${className}`}>
      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-xs">출발지</p>
        <p className="font-bold ">{from}</p>
      </div>

      {showArrow && <div className="flex items-center mt-3">→</div>}

      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-xs">도착지</p>
        <p className="font-bold">{to}</p>
      </div>
    </div>
  );
}
