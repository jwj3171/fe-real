"use client";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { sendEstimateApi, type SendEstimatePayload } from "@/lib/api/quote";
import { useAlertModal } from "@/components/common/modal/AlertModal";
import { ReactNode } from "react";

type SendEstimateResult = unknown;
type UseSendEstimateReturn = UseMutationResult<
  SendEstimateResult,
  Error,
  SendEstimatePayload
> & { Modal: () => ReactNode };

export function useSendEstimate(): UseSendEstimateReturn {
  const { alert, Modal } = useAlertModal();

  const mutation = useMutation<SendEstimateResult, Error, SendEstimatePayload>({
    mutationFn: (payload) => sendEstimateApi(payload),
    onSuccess: async (data) => {
      console.log("견적 전송 성공 ✅", data);
      await alert({
        title: "작성 성공",
        message: "견적이 성공적으로 전송되었습니다!",
      });
    },
    onError: async (error) => {
      console.error("견적 전송 실패 ❌", error);
      await alert({
        title: "작성 실패",
        message: "견적 전송에 실패했습니다. 다시 시도해주세요.",
      });
    },
  });

  return { ...mutation, Modal };
}
