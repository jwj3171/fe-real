import React from "react";

interface CardDateInfoProps {
  movingDate: string;
  className?: string;
}

export default function CardDateInfo({
  movingDate,
  className = "",
}: CardDateInfoProps) {
  return (
    <div className={`f mt-1 ${className}`}>
      <p className="font-medium text-gray-400">이사일</p>
      <p className="font-bold">{movingDate}</p>
    </div>
  );
}
