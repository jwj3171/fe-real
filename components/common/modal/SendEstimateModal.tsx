"use client";

import BaseModal from "@/components/common/modal/BaseModal";
import TextArea from "@/components/common/input/TextArea";
import CardDateInfo from "../card/CardDateInfo";
import CardRouteInfo from "../card/CardRouteInfo";
import CardHeader from "../card/CardHeaderCustomer";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import TextInput from "../input/TextInput";

interface SendEstimateModalProps {
  trigger: React.ReactNode;
  customerName: string;
  departure?: string;
  destination?: string;
  moveDate?: string;
  className?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function SendEstimateModal({
  trigger,
  customerName,
  departure,
  destination,
  moveDate,
  className,
  chips = [],
}: SendEstimateModalProps) {
  return (
    <BaseModal
      trigger={trigger}
      title="견적 보내기"
      departure={departure}
      destination={destination}
      moveDate={moveDate}
      textAreaLabel="코멘트를 입력해 주세요"
      confirmText="견적 보내기"
      extraFields={
        <TextInput
          id="estimatePrice"
          label="견적가를 입력해 주세요"
          placeholder="견적가 입력"
          type="number"
        />
      }
    >
      <div className="flex flex-col gap-6">
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
