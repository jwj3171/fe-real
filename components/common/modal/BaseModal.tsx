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
  showRouteInfo?: boolean;
  showTextArea?: boolean;
  textAreaLabel?: string;
  minLength?: number;
  extraFields?: React.ReactNode;
  confirmText?: string;
  confirmLoading?: boolean;
  validate?: (value: string) => boolean;
  onConfirm?: (value: string) => void | Promise<void>;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  showRouteInfo = true,
  showTextArea = true,
  textAreaLabel = "내용을 입력해 주세요",
  minLength = 10,
  extraFields,
  confirmText,
  confirmLoading,
  validate,
  onConfirm,
  open,
  onOpenChange,
}: BaseModalProps) {
  const [value, setValue] = useState("");

  const baseValid = !showTextArea || value.trim().length >= minLength;
  const extraValid = validate ? validate(value) : true;
  const disabled = Boolean(confirmLoading) || !(baseValid && extraValid);

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
          className={[
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-lg sm:gap-6 sm:rounded-4xl sm:p-6",
            "w-[calc(100vw-32px)] max-w-[420px] sm:w-[600px] sm:max-w-none",
            "max-h-[calc(100dvh-32px)] overflow-y-auto",

            className || "",
          ].join(" ")}
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
          {description && (
            <Dialog.Description className="text-[14px] font-normal sm:text-[18px]">
              {description}
            </Dialog.Description>
          )}

          {children}

          {showRouteInfo && (
            <div className="flex items-center justify-between gap-2">
              <CardRouteInfo from={departure || ""} to={destination || ""} />
              <CardDateInfo movingDate={moveDate || ""} />
            </div>
          )}

          {extraFields}

          {showTextArea && (
            <TextArea
              id="textarea"
              label={textAreaLabel}
              placeholder={`최소 ${minLength}자 이상 입력해주세요`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          <Dialog.Close asChild>
            <Buttons
              disabled={disabled}
              className={`mt-4 w-full rounded-lg px-4 py-2 ${
                disabled
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "cursor-pointer bg-orange-400 text-white hover:bg-orange-500"
              }`}
              onClick={() => onConfirm?.(value.trim())}
            >
              {confirmLoading ? "처리 중..." : confirmText}
            </Buttons>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
