"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function ChargeModal({
  open,
  onClose,
  title,
  children,
  footer,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-101 w-[92%] max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-2xl">
        {title && (
          <div className="mb-4 text-[20px] font-bold sm:text-[24px]">
            {title}
          </div>
        )}
        <div className="text-[16px] font-semibold sm:text-[18px]">
          {children}
        </div>
        {footer && <div className="">{footer}</div>}
      </div>
    </div>
  );
}
