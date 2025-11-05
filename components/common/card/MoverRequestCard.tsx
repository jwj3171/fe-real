// components/common/card/MoverRequestCard.tsx
"use client";

import CardDateInfo from "./CardDateInfo";
import CardRouteInfo from "./CardRouteInfo";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeaderCustomer from "./CardHeaderCustomer";
import MoverDescription from "./Mover/MoverDescription";
import MoverAvatar from "./Mover/MoverAvatar";

interface MoverRequestProps {
  customerName: string;
  description: string;
  from: string;
  to: string;
  movingDate: string;
  isQuoted?: boolean;
  onClick?: () => void;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
  action?: React.ReactNode; // 우진수정
}

export default function MoverRequest({
  customerName,
  description,
  from,
  to,
  movingDate,
  isQuoted = false,
  chips = [],
  action, // 우진수정
}: MoverRequestProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <MoverAvatar
          size={100}
          className="rounded-xl object-cover sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
        />
        <div className="flex flex-col gap-2">
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
          <div className="flex items-center">
            <div className="flex items-center border-0">
              <CardHeaderCustomer customerName={customerName} />
            </div>
          </div>

          <div>
            <MoverDescription description={description} />
          </div>

          <div className="flex justify-between gap-3 text-sm font-bold max-[480px]:grid max-[480px]:grid-cols-1 max-[480px]:gap-1">
            {/* 경로 정보 */}
            <div className="min-w-0">
              <div className="truncate">
                <CardRouteInfo from={from} to={to} />
              </div>
            </div>

            {/* 이사일 */}
            <div className="// [수정] 480px 이하에서는 두 번째 행(아래)로 떨어지도록 하고 우측 정렬 유지 text-right max-[480px]:order-3 max-[480px]:col-span-1 max-[480px]:mt-1 max-[480px]:ml-0 md:ml-5">
              <CardDateInfo movingDate={movingDate} />
            </div>
          </div>
        </div>
      </div>

      {/* 우진수정 */}
      {action ? (
        action
      ) : isQuoted ? (
        <div className="mt-25 rounded-lg border border-red-400 bg-red-50 px-4 py-2 font-semibold text-red-500">
          고객 확인 대기 중
        </div>
      ) : null}
    </div>
  );
}
