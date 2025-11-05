"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ChargeModal from "@/components/common/modal/ChargeModal";

type ResultState =
  | { status: "idle" }
  | { status: "success"; amount: number; newBalance?: number }
  | { status: "fail"; code?: string | null; message?: string | null };

export default function ChargePage() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [loadingAmount, setLoadingAmount] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<ResultState>({ status: "idle" });
  const isMounted = useRef(false);

  const amounts = useMemo(() => [100, 500, 1000, 5000, 10000, 50000], []);

  const amountIcons = useMemo<Record<number, string>>(
    () => ({
      100: "/assets/img-point.png",
      500: "/assets/img-point.png",
      1000: "/assets/img-point.png",
      5000: "/assets/img-point.png",
      10000: "/assets/img-point.png",
      50000: "/assets/img-point.png",
    }),
    [],
  );

  useEffect(() => {
    isMounted.current = true;
    const onMsg = (e: MessageEvent) => {
      const data = e.data || {};
      if (data?.type === "toss:success" && isMounted.current) {
        setResult({
          status: "success",
          amount: Number(data.amount),
          newBalance: data.newBalance,
        });
        setModalOpen(true);
      }
      if (data?.type === "toss:fail" && isMounted.current) {
        setResult({ status: "fail", code: data.code, message: data.message });
        setModalOpen(true);
      }
    };
    window.addEventListener("message", onMsg);
    return () => {
      isMounted.current = false;
      window.removeEventListener("message", onMsg);
    };
  }, []);

  useEffect(() => {
    const status = sp.get("status");
    if (!status) return;

    if (status === "success") {
      const amount = Number(sp.get("amount") || "0");
      const newBalance = sp.get("newBalance")
        ? Number(sp.get("newBalance"))
        : undefined;
      setResult({ status: "success", amount, newBalance });
      setModalOpen(true);
    } else if (status === "fail") {
      setResult({
        status: "fail",
        code: sp.get("code"),
        message: sp.get("message"),
      });
      setModalOpen(true);
    }
    router.replace(pathname);
  }, [sp, pathname, router]);

  const pay = async (amount: number) => {
    try {
      setLoadingAmount(amount);
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
      if (!clientKey)
        throw new Error(
          "환경변수 NEXT_PUBLIC_TOSS_CLIENT_KEY가 설정되지 않았습니다.",
        );

      const toss = await loadTossPayments(clientKey);
      const orderId = `POINT_${Date.now()}`;
      const orderName = `포인트 충전 ${amount.toLocaleString()}원`;

      await toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        successUrl: `${window.location.origin}/points/success`,
        failUrl: `${window.location.origin}/points/fail`,
      });
    } finally {
      setLoadingAmount(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (result.status === "success") router.push("/points/history");
  };

  return (
    <main className="mx-auto max-w-[1120px] p-6">
      <h1 className="mb-2 text-[20px] font-bold sm:mb-4 sm:text-[24px]">
        포인트 충전
      </h1>
      <p className="mb-3 text-sm text-gray-600">
        원화 = 동일 포인트로 적립됩니다.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {amounts.map((amt) => {
          const isLoading = loadingAmount === amt;
          const iconSrc = amountIcons[amt] ?? "/points/default.png";
          return (
            <button
              key={amt}
              onClick={() => pay(amt)}
              disabled={loadingAmount !== null}
              className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-400/30 disabled:opacity-50"
            >
              <Image
                src={iconSrc}
                alt={`${amt.toLocaleString()}원 아이콘`}
                width={150}
                height={150}
                className="pointer-events-none select-none"
              />
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-700 border-t-transparent" />
              ) : (
                <span className="text-[16px] font-bold text-black sm:text-[20px]">
                  {amt.toLocaleString()}원
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ChargeModal
        open={modalOpen}
        onClose={closeModal}
        title="결제 결과"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={closeModal}
              className="rounded bg-orange-600 px-4 py-2 text-[18px] text-white"
            >
              확인
            </button>
          </div>
        }
      >
        {result.status === "success" ? (
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[18px] font-bold text-orange-600 sm:text-[20px]">
              포인트가 충전되었습니다.
            </p>
            <p>
              {result.amount.toLocaleString()}원 →{" "}
              {result.amount.toLocaleString()}P 적립
            </p>
            {result.newBalance !== undefined && (
              <p className="text-[14px] text-gray-600 sm:text-[16px]">
                현재 잔액: {result.newBalance.toLocaleString()}P
              </p>
            )}
            <p className="mt-1 text-[12px] font-normal text-gray-500 sm:mt-2 sm:text-[14px]">
              확인을 누르면 결제 내역으로 이동합니다.
            </p>
          </div>
        ) : result.status === "fail" ? (
          <div className="space-y-1 sm:space-y-2">
            <p className="text-[18px] font-bold text-red-700 sm:text-[20px]">
              결제 승인에 실패했습니다.
            </p>
            <p className="text-gray-700">
              {result.code ? `코드: ${result.code}` : null}
              {result.code && result.message ? <br /> : null}
              {result.message ? `메시지: ${result.message}` : null}
            </p>
            <p className="mt-1 text-[12px] font-normal text-gray-500 sm:mt-2 sm:text-[14px]">
              다시 시도해 주세요.
            </p>
          </div>
        ) : null}
      </ChargeModal>
    </main>
  );
}
