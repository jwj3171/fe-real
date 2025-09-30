"use client";
import Link from "next/link";
import type { MoveRequest } from "@/types/move";
import { ServiceChip } from "../chip";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("ko-KR");
const formatDateTime = (iso: string) => new Date(iso).toLocaleString("ko-KR");

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
      className={`block rounded-xl border p-6 transition hover:shadow-sm ${className ?? ""}`}
      prefetch
    >
      <div className="m mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ServiceChip size="sm" iconSrc={svc.iconSrc}>
            {svc.label}
          </ServiceChip>
          <span className="text-sm text-gray-500">{req.status}</span>
        </div>
        <span className="mt-1 text-xs text-gray-400">
          등록일 {formatDateTime(req.createdAt)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[22px] font-bold text-black">
          {formatDate(req.moveDate)}
        </div>
        <div className="mt-1 text-gray-800">
          {req.departure} ({req.departureRegion}) → {req.destination} (
          {req.destinationRegion})
        </div>
      </div>
    </Link>
  );
}
