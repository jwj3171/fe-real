"use client";

import { useEffect } from "react";
import clientApi from "@/lib/api/axiosClient.client";

export default function SuccessPage() {
  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const paymentKey = url.searchParams.get("paymentKey");
      const orderId = url.searchParams.get("orderId");
      const amount = Number(url.searchParams.get("amount") || "0");

      try {
        const { data } = await clientApi.post("/payments/toss/confirm", {
          paymentKey,
          orderId,
          amount,
        });

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            { type: "toss:success", amount, newBalance: data?.newBalance },
            "*",
          );
          window.close();
          return;
        }

        const qs = new URLSearchParams({
          status: "success",
          amount: String(amount),
          ...(data?.newBalance ? { newBalance: String(data.newBalance) } : {}),
        });
        window.location.replace(`/points/charge?${qs.toString()}`);
      } catch (e: any) {
        const r = e?.response;
        const toss = r?.data?.toss;
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: "toss:fail",
              code: toss?.code ?? "",
              message: toss?.message ?? "",
            },
            "*",
          );
          window.close();
          return;
        }
        const qs = new URLSearchParams({
          status: "fail",
          code: toss?.code ?? "",
          message: toss?.message ?? "",
        });
        window.location.replace(`/points/charge?${qs.toString()}`);
      }
    })();
  }, []);

  return null;
}
