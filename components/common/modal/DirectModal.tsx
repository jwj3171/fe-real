// components/common/modal/BaseModal.tsx
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
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
  open,
  onOpenChange,
  onConfirm,
}: BaseModalProps) {
  const [value, setValue] = useState("");

  const isValid = value.length >= 10;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setValue("");
        onOpenChange?.(nextOpen);
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className={`fixed top-1/2 left-1/2 flex w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-4xl bg-white p-6 shadow-lg ${className || ""}`}
        >
          <div className="flex items-center justify-between">
            {title && (
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <Cross2Icon className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
