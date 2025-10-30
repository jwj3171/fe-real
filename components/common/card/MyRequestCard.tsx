"use client";
import Link from "next/link";
import type { MoveRequest } from "@/types/move";
import { ServiceChip } from "../chip";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("ko-KR");
const formatDateOnly = (iso: string) => {
  return new Date(iso).toLocaleDateString("ko-KR");
};

const serviceChipMap: Record<
  MoveRequest["serviceType"],
  { label: string; iconSrc: string }
> = {
  SMALL: { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  FAMILY: { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
  OFFICE: { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
};

type Props = {
  req: MoveRequest;
  href?: string;
  className?: string;
};

export default function MyRequestCard({ req, href, className }: Props) {
  const link = href ?? `/myEstimates/${req.id}`;
  const svc = serviceChipMap[req.serviceType];

  return (
    <Link
      href={link}
      className={`block rounded-xl border border-gray-200 p-4 transition hover:shadow-sm sm:p-5 ${className ?? ""}`}
      prefetch
    >
      <div className="mb-1 flex items-center justify-between sm:mb-3">
        <div className="flex items-center gap-3">
          <ServiceChip size="sm" iconSrc={svc.iconSrc}>
            {svc.label}
          </ServiceChip>
          <span className="text-sm text-gray-500">{req.status}</span>
        </div>
        <div className="text-[18px] font-bold text-black sm:text-[22px]">
          {formatDate(req.moveDate)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="mt-1 text-xs text-gray-400">
          등록일 {formatDateOnly(req.createdAt)}
        </span>
        <div className="flex flex-col text-center text-[14px] text-gray-800 sm:flex-row sm:text-[16px]">
          <span>{req.departure}</span>
          <span className="mr-1 ml-1 hidden sm:inline">➜</span>
          <span className="-mt-1 -mb-1 text-[10px] sm:hidden">⬇</span>
          <span>{req.destination}</span>
        </div>
      </div>
    </Link>
  );
}
