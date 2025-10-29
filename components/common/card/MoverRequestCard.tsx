// components/common/card/MoverRequestCard.tsx
"use client";

import Image from "next/image";
import { Buttons } from "../button";
import CardDateInfo from "./CardDateInfo";
import CardRouteInfo from "./CardRouteInfo";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeaderCustomer from "./CardHeaderCustomer";
import MoverMessage from "./Mover/MoverMessage";
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

  //우진수정
  action?: React.ReactNode;
}

export default function MoverRequest({
  customerName,
  description,
  from,
  to,
  movingDate,
  isQuoted = false,
  chips = [],
  //우진수정
  action,
}: MoverRequestProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <MoverAvatar className="flex-shrink-0" size={134} /> {/* 해상 수정 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="flex items-center [&_*]:border-0">
              <CardHeaderCustomer customerName={customerName} />
            </div>
          </div>
          <div>
            <MoverDescription description={description} />
          </div>
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
          <div className="flex justify-between gap-3 text-sm font-bold">
            <CardRouteInfo from={from} to={to} />
            <div className="ml-5">
              <CardDateInfo movingDate={movingDate} />
            </div>
          </div>
        </div>
      </div>
      {/* 우진수정 */}
      <Buttons size="figma" className="bg-white">
        {action ? (
          action
        ) : isQuoted ? (
          <div className="mt-25 rounded-lg border border-red-400 bg-red-50 px-4 py-2 font-semibold text-red-500">
            고객 확인 대기 중
          </div>
        ) : null}
      </Buttons>
    </div>
  );
}
