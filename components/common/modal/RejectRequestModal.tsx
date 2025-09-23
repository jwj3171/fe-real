"use client";

import BaseModal from "@/components/common/modal/BaseModal";
import TextArea from "@/components/common/input/TextArea";
import CardDateInfo from "../card/CardDateInfo";
import CardRouteInfo from "../card/CardRouteInfo";
import CardHeader from "../card/CardHeaderCustomer";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface RejectRequestModalProps {
  trigger: React.ReactNode;
  customerName: string;
  departure: string;
  destination: string;
  moveDate: string;
  className?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function RejectRequestModal({
  trigger,
  customerName,
  departure,
  destination,
  moveDate,
  className,
  chips = [],
}: RejectRequestModalProps) {
  return (
    <BaseModal
      trigger={trigger}
      title="반려요청"
      departure={departure}
      destination={destination}
      moveDate={moveDate}
      textAreaLabel="반려 사유를 입력해 주세요"
      confirmText="반려하기"
    >
      <div className="flex flex-col gap-9">
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

        <div className="flex flex-col gap-3 space-y-2 text-sm">
          <CardHeader customerName={customerName} className="text-sm" />
        </div>
      </div>
    </BaseModal>
  );
}
