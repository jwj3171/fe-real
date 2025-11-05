"use client";

import { Buttons } from "@/components/common/button/Buttons";
import Image from "next/image";
import RequestList from "./RequestList";
import { toggleLike } from "@/lib/api/likes";
import { useQueryClient } from "@tanstack/react-query";
import DirectModal from "@/components/common/modal/DirectModal";
import { useAlertModal } from "@/components/common/modal/AlertModal";

type Props = { mover: any };

const SERVICE_LABELS: Record<string, string> = {
  SMALL: "소형이사",
  FAMILY: "가정이사",
  OFFICE: "사무실이사",
};
/* ----------------------------------------------------------- */

export default function MoverDetailSideBar({ mover }: Props) {
  const queryClient = useQueryClient();
  const { alert, Modal } = useAlertModal();

  // 공유 버튼 공통 스타일
  const shareBtn =
    "flex h-16 w-16 p-[10px] justify-center items-center gap-[10px] rounded-[16px] bg-white cursor-pointer";
  const shareIcon = "object-contain";

  const getCurrentUrl = () =>
    typeof window === "undefined" ? "" : window.location.href;

  const copyCurrentUrl = async (showAlert = true) => {
    const url = getCurrentUrl();
    try {
      await navigator.clipboard.writeText(url);
      if (showAlert)
        alert({
          title: "링크 복사",
          message: "링크가 클립보드에 복사되었습니다.",
        });
    } catch {
      // iOS/Safari fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (showAlert)
        alert({
          title: "링크 복사",
          message: "링크가 클립보드에 복사되었습니다.",
        });
    }
  };

  const openPopup = (href: string) => {
    if (typeof window === "undefined") return;
    window.open(href, "_blank", "width=600,height=700,noopener,noreferrer");
  };

  const shareToKakao = async () => {
    const url = encodeURIComponent(getCurrentUrl());
    await copyCurrentUrl(false);
    // 웹 대체: 카카오스토리 공유 (SDK 없이)
    openPopup(`https://story.kakao.com/share?url=${url}`);
  };

  const shareToFacebook = async () => {
    const url = encodeURIComponent(getCurrentUrl());
    await copyCurrentUrl(false);
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const handleToggleLike = async (moverId: number) => {
    const response = await toggleLike(moverId);
    alert({ message: response.message });
    queryClient.invalidateQueries({ queryKey: ["likes-count", moverId] });
  };

  return (
    <aside className="flex w-full flex-col items-start gap-4 md:w-[320px]">
      {/* 지정 견적 카드 */}
      <div className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-md font-semibold text-zinc-900">
          {mover.name} 기사님에게
        </div>
        <div className="text-md mt-1 font-semibold text-zinc-900">
          지정 견적을 요청해보세요!
        </div>

        <DirectModal
          title="지정 견적 요청하기"
          trigger={
            <Buttons className="mt-4 h-16 w-full cursor-pointer rounded-[20px] bg-[#FF5A3D] px-6 text-lg font-semibold text-white hover:bg-[#e04e36]">
              {"지정 견적 요청하기"}
            </Buttons>
          }
        >
          <RequestList moverId={Number(mover.id)} />
        </DirectModal>

        <Buttons
          variant="outline"
          color="neutral"
          size="figma"
          className="mt-4 w-full cursor-pointer gap-[10px] rounded-[16px] border-zinc-200 bg-white p-[10px] whitespace-nowrap text-zinc-900 hover:bg-[#DCDCDC]"
          leftIcon={
            <Image
              src="/icons/ic_like-active.svg"
              alt="찜 아이콘"
              width={20}
              height={20}
            />
          }
          onClick={() => handleToggleLike(mover.id)}
        >
          기사님 찜하기
        </Buttons>
      </div>

      {/* 공유 카드 */}
      <div className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-3 text-sm font-semibold text-zinc-900">
          나만 알기엔 아쉬운 기사님인가요?
        </div>
        <div className="flex items-center gap-3">
          {/* 링크 복사 */}
          <button
            type="button"
            aria-label="링크 복사"
            className={shareBtn}
            onClick={() => copyCurrentUrl()}
          >
            <Image
              src="/icons/share-clip.svg"
              alt="링크 복사"
              width={64}
              height={64}
              className={shareIcon}
            />
          </button>

          {/* 카카오 공유 */}
          <button
            type="button"
            aria-label="카카오 공유"
            className={shareBtn}
            onClick={() => shareToKakao()}
          >
            <Image
              src="/icons/share-kakao.svg"
              alt="카카오 공유"
              width={64}
              height={64}
              className={shareIcon}
            />
          </button>

          {/* 페이스북 공유 */}
          <button
            type="button"
            aria-label="페이스북 공유"
            className={shareBtn}
            onClick={() => shareToFacebook()}
          >
            <Image
              src="/icons/share-facebook.svg"
              alt="페이스북 공유"
              width={64}
              height={64}
              className={shareIcon}
            />
          </button>
        </div>
      </div>
      <Modal />
    </aside>
  );
}
