"use client";

import { useRef, useState } from "react";

export interface AlertModalOptions {
  title?: string;
  message?: string | React.ReactNode;
  confirmText?: string;
  danger?: boolean;
}

export function useAlertModal() {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<AlertModalOptions>({});
  const resolver = useRef<(() => void) | null>(null);

  const alert = (options: AlertModalOptions): Promise<void> =>
    new Promise<void>((resolve) => {
      setOpts(options);
      setOpen(true);
      resolver.current = resolve;
    });

  const handleClose = () => {
    const resolve = resolver.current;
    resolver.current = null;
    setOpen(false);
    resolve?.();
  };

  const Modal = () => {
    if (!open) return null;

    const { title = "알림", message = "", confirmText = "확인" } = opts;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        className="fixed inset-0 z-100 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
        <div className="relative w-[90%] max-w-[300px] rounded-2xl bg-white p-5 shadow-2xl">
          <h2 id="alert-title" className="text-[16px] font-bold sm:text-[20px]">
            {title}
          </h2>
          <div className="mt-3 text-[14px] text-zinc-700 sm:text-[16px]">
            {message}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              autoFocus
              className="rounded-lg bg-orange-600 px-3 py-2 text-[16px] font-semibold text-white hover:bg-orange-700"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return { alert, Modal };
}
