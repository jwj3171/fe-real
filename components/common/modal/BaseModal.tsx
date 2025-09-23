"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import TextArea from "../input/TextArea";

interface BaseModalProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;

  textAreaId: string;
  textAreaLabel?: string;
}

export default function BaseModal({
  trigger,
  title,
  description,
  children,
  className,
  textAreaId,
  textAreaLabel,
}: BaseModalProps) {
  const [value, setValue] = useState("");

  const isValid = value.length >= 10;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className={`fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg flex flex-col gap-6 ${
            className || ""
          }`}
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
            <Dialog.Description className="text-gray-500">
              {description}
            </Dialog.Description>
          )}

          <TextArea
            id={textAreaId}
            label={textAreaLabel}
            placeholder="최소 10자 이상 입력해주세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Dialog.Close asChild>
            <button
              disabled={!isValid}
              className={`mt-4 px-4 py-2 rounded-lg w-full 
                ${
                  isValid
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              반려하기
            </button>
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
