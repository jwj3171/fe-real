import React from "react";

interface CardDateInfoProps {
  movingDate: string;
  className?: string;
}

export default function CardDateInfo({
  movingDate,
  className = "",
}: CardDateInfoProps) {
  const formattedDate = new Date(movingDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <p className="text-[14px] text-gray-400 sm:text-[16px]">이사일</p>
      <p className="text-[14px] font-bold sm:text-[18px]">{formattedDate}</p>
    </div>
  );
}
