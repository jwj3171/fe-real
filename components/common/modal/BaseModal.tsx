"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import TextArea from "../input/TextArea";
import CardRouteInfo from "../card/CardRouteInfo";
import CardDateInfo from "../card/CardDateInfo";
import { Buttons } from "../button";

interface BaseModalProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  departure?: string;
  destination?: string;
  moveDate?: string;
  textAreaLabel?: string;
  extraFields?: React.ReactNode;
  showRouteInfo?: boolean;
  showTextArea?: boolean;
  confirmText?: string;
}

export default function BaseModal({
  trigger,
  title,
  description,
  children,
  className,
  departure,
  destination,
  moveDate,
  textAreaLabel = "내용을 입력해 주세요",
  extraFields,
  showRouteInfo = true,
  showTextArea = true,
  confirmText,
}: BaseModalProps) {
  const [value, setValue] = useState("");

  const isValid = value.length >= 10;

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) setValue("");
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className={`fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 
            rounded-4xl bg-white p-6 shadow-lg flex flex-col gap-6 ${className || ""}`}
        >
          <div className="flex items-center justify-between">
            {title && (
              <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="font-normal text-sm">
              {description}
            </Dialog.Description>
          )}

          {children}

          {showRouteInfo && (
            <div className="flex justify-between items-start gap-6 text-xs">
              <CardRouteInfo from={departure || ""} to={destination || ""} />
              <CardDateInfo movingDate={moveDate || ""} />
            </div>
          )}

          {extraFields}

          {showTextArea && (
            <TextArea
              id="textarea"
              label={textAreaLabel}
              placeholder="최소 10자 이상 입력해주세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          <Dialog.Close asChild>
            <Buttons
              disabled={showTextArea ? !isValid : false}
              className={`mt-4 px-4 py-2 rounded-lg w-full 
            ${
              showTextArea
                ? isValid
                  ? "bg-orange-400 text-white hover:bg-orange-500 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500 cursor-pointer"
            }`}
            >
              {confirmText || "확인"}
            </Buttons>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// page.tsx 테스트 코드
//  <div className="p-10">
//       <BaseModal
//         trigger={
//           <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
//             base modal
//           </button>
//         }
//         title="Base Modal"
//       >
//         <p>이 모달에 추가해서 넣으면 됩니다</p>
//       </BaseModal>
//     </div>
