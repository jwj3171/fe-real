"use client";

import Image from "next/image";
import EstimateForm from "./EstimateForm";
import { useEstimateStore } from "@/store/estimateStore";

export default function EstimatePage() {
  const { hasActiveEstimate } = useEstimateStore();
  return (
    <main
      className={`flex justify-center bg-gray-100 p-6 ${
        hasActiveEstimate ? "min-h-screen items-center" : ""
      }`}
    >
      {hasActiveEstimate ? (
        <div className="justify-centerp-12 flex min-h-[600px] w-full max-w-[894px] flex-col items-center">
          <Image
            src="/assets/moving_car 1.svg"
            alt="진행중 견적 없음"
            width={320}
            height={320}
            className="opacity-70"
          />
          <p className="mt-6 text-center text-gray-500">
            현재 진행 중인 이사 견적이 있어요! <br />
            진행 중인 이사 완료 후 새로운 견적을 받아보세요.
          </p>
          <button className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600">
            받은 견적 보러가기
          </button>
        </div>
      ) : (
        <EstimateForm />
      )}
    </main>
  );
}
