// components/common/modal/SendEstimateModal.tsx
"use client";

import { useState } from "react";
import BaseModal from "@/components/common/modal/BaseModal";
import TextInput from "../input/TextInput";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeader from "../card/CardHeaderCustomer";
import { useSendEstimate } from "@/hooks/useSendEstimate";

interface SendEstimateModalProps {
  trigger: React.ReactNode;
  customerName: string;
  moveRequestId: number;
  departure?: string;
  destination?: string;
  moveDate?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
  quoteType?: "NORMAL" | "DIRECT";
}

export default function SendEstimateModal({
  trigger,
  customerName,
  moveRequestId,
  departure,
  destination,
  moveDate,
  chips = [],
  quoteType = "NORMAL",
}: SendEstimateModalProps) {
  const [price, setPrice] = useState("");
  const sendEstimate = useSendEstimate();
  const priceNum = Number(price);
  const isPriceValid = Number.isFinite(priceNum) && priceNum > 0;

  return (
    <BaseModal
      className="z-100"
      trigger={trigger}
      title="견적 보내기"
      departure={departure}
      destination={destination}
      moveDate={moveDate}
      textAreaLabel="코멘트를 입력해 주세요"
      minLength={10}
      validate={() => isPriceValid}
      confirmText={sendEstimate.isPending ? "전송 중..." : "견적 보내기"}
      confirmLoading={sendEstimate.isPending}
      onConfirm={async (comment) => {
        await sendEstimate.mutateAsync({
          moveRequestId,
          price: priceNum,
          comment,
          type: quoteType,
        });
        setPrice("");
      }}
      extraFields={
        <TextInput
          id="estimatePrice"
          label="견적가를 입력해 주세요"
          placeholder="견적가 입력"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, idx) => (
              <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
                {chip.label}
              </ServiceChip>
            ))}
          </div>
        )}
        <CardHeader customerName={customerName} className="text-lg" />
      </div>
    </BaseModal>
  );
}

// "use client";

// import BaseModal from "@/components/common/modal/BaseModal";
// import TextArea from "@/components/common/input/TextArea";
// import CardDateInfo from "../card/CardDateInfo";
// import CardRouteInfo from "../card/CardRouteInfo";
// import CardHeader from "../card/CardHeaderCustomer";
// import { ServiceChip } from "../chip";
// import { ServiceChipProps } from "../chip/presets";
// import TextInput from "../input/TextInput";

// interface SendEstimateModalProps {
//   trigger: React.ReactNode;
//   customerName: string;
//   departure?: string;
//   destination?: string;
//   moveDate?: string;
//   className?: string;
//   chips?: (Omit<ServiceChipProps, "iconSrc"> & {
//     label: string;
//     iconSrc: string;
//   })[];
// }

// export default function SendEstimateModal({
//   trigger,
//   customerName,
//   departure,
//   destination,
//   moveDate,
//   className,
//   chips = [],
// }: SendEstimateModalProps) {
//   return (
//     <BaseModal
//       trigger={trigger}
//       title="견적 보내기"
//       departure={departure}
//       destination={destination}
//       moveDate={moveDate}
//       textAreaLabel="코멘트를 입력해 주세요"
//       confirmText="견적 보내기"
//       extraFields={
//         <TextInput
//           id="estimatePrice"
//           label="견적가를 입력해 주세요"
//           placeholder="견적가 입력"
//           type="number"
//         />
//       }
//     >
//       <div className="flex flex-col gap-6">
//         <div className="space-y-3">
//           {chips.length > 0 && (
//             <div className="flex flex-wrap gap-3">
//               {chips.map((chip, idx) => (
//                 <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
//                   {chip.label}
//                 </ServiceChip>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col gap-3 space-y-2 text-lg">
//           <CardHeader customerName={customerName} className="text-lg" />
//         </div>
//       </div>
//     </BaseModal>
//   );
// }
