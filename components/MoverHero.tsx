"use client";

import MoverName from "@/components/common/card/Mover/MoverName";
import MoverDescription from "@/components/common/card/Mover/MoverDescription";
import { Buttons } from "@/components/common/button/Buttons";
import { Chip } from "@/components/common/chip/Chips";
import Image from "next/image";
import BaseModal from "./common/modal/DirectModal";
import RequestList from "@/app/(mover)/movers/[moverId]/components/RequestList";
import {
  LikeActiveIcon,
  ShareClipIcon,
  ShareKakaoIcon,
  ShareFacebookIcon,
} from "@/components/common/button/icons";

type Props = { mover: any };

/* ------------------------- 공유 유틸 ------------------------- */
function getCurrentUrl() {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

async function copyCurrentUrl(showAlert = true) {
  const url = getCurrentUrl();
  try {
    await navigator.clipboard.writeText(url);
    if (showAlert) alert("링크가 클립보드에 복사되었습니다.");
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
    if (showAlert) alert("링크가 클립보드에 복사되었습니다.");
  }
}

function openPopup(href: string) {
  if (typeof window === "undefined") return;
  window.open(href, "_blank", "width=600,height=700,noopener,noreferrer");
}

async function shareToKakao() {
  const url = encodeURIComponent(getCurrentUrl());
  await copyCurrentUrl(false);
  // 웹 대체: 카카오스토리 공유 (SDK 없이)
  openPopup(`https://story.kakao.com/share?url=${url}`);
}

async function shareToFacebook() {
  const url = encodeURIComponent(getCurrentUrl());
  await copyCurrentUrl(false);
  openPopup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
}
/* ----------------------------------------------------------- */

export default function MoverHero({ mover }: Props) {
  // 공유 버튼 공통 스타일
  const shareBtn =
    "flex h-16 w-16 p-[10px] justify-center items-center gap-[10px] rounded-[16px] bg-white cursor-pointer";
  const shareIcon = "object-contain";

  // 데이터(안전)
  const services = (mover.moverServiceTypes as any[]) ?? [];
  const regions = (mover.moverRegions as any[]) ?? [];

  return (
    <section className="relative">
      {/* 1) 오렌지 배너 */}
      <div className="w-full shrink-0 bg-[#FF5A3D]">
        <div className="mx-auto h-[225px] max-w-[1920px]" />
      </div>

      {/* 2) 본문: 좌(컨텐츠) / 우(사이드 카드) */}
      <div className="mx-auto -mt-12 grid max-w-[1120px] grid-cols-1 gap-8 px-6 md:grid-cols-[minmax(0,720px)_320px]">
        {/* ===== 좌측 컨텐츠 ===== */}
        <div className="relative mx-auto w-full">
          {/* 아바타 */}
          <div className="flex w-full">
            <div className="relative -mt-10 h-[96px] w-[96px] overflow-hidden rounded-2xl bg-white shadow-md">
              <Image
                src="/assets/profile_mover_detail.svg"
                alt={`${mover.nickname} 프로필`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* 카테고리 배지(예: 소형이사) */}
          <div className="mt-3 flex">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0EC] px-2.5 py-1 text-[12px] font-semibold text-[#FF5A3D]">
              소형이사
            </span>
          </div>

          {/* 제목 + 좋아요 */}
          <div className="relative mt-3">
            <div className="text-center">
              <MoverName
                MoverName={`${mover.nickname}`}
                className="text-[18px] font-extrabold text-zinc-900"
              />
            </div>
            <div className="absolute top-0 right-0 hidden items-center gap-1 text-sm text-zinc-500 md:flex">
              <LikeActiveIcon className="h-4 w-4" />
              <span>{mover._count.likes}</span>
            </div>
          </div>

          {/* 소개 */}
          <div className="mx-auto mt-2 max-w-[720px]">
            <MoverDescription
              description={mover.introduction}
              className="leading-relaxed text-zinc-600"
            />
          </div>

          {/* 통계 3칸 */}
          <div className="mx-auto mt-6 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "진행", value: `${mover._count.quotes}건` },
              { label: "리뷰", value: `${mover.averageRating.toFixed(1)} ⭐` },
              { label: "총 경력", value: `${mover.career}` },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-4"
              >
                <div className="text-[13px] text-zinc-500">{c.label}</div>
                <div className="text-[16px] font-semibold text-zinc-900">
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          {/* ───────── 제공 서비스(칩) ───────── */}
          {services.length > 0 && (
            <section className="mt-8">
              <h3 className="mb-3 text-[14px] font-semibold text-zinc-900">
                제공 서비스
              </h3>
              <div className="flex flex-wrap gap-3">
                {services.map((s) => (
                  <Chip key={s.id} variant="outline" color="primary" size="lg">
                    {s.serviceType}
                  </Chip>
                ))}
              </div>
            </section>
          )}

          {/* ──────── 서비스 가능 지역(칩) ──────── */}
          {regions.length > 0 && (
            <section className="mt-6">
              <h3 className="mb-3 text-[14px] font-semibold text-zinc-900">
                서비스 가능 지역
              </h3>
              <div className="flex flex-wrap gap-3">
                {regions.map((r) => (
                  <Chip key={r.id} variant="outline" color="neutral" size="lg">
                    {r.region}
                  </Chip>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ===== 우측 사이드 ===== */}
        <aside className="flex w-full flex-col items-start gap-4 md:w-[320px]">
          {/* 지정 견적 카드 */}
          <div className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              {mover.name} 기사님께
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              지정 견적을 요청해보세요!
            </div>

            <BaseModal
              title="지정 견적 요청하기"
              trigger={<Buttons>{"지정 견적 요청하기"}</Buttons>}
            >
              <RequestList moverId={Number(mover.id)} />
            </BaseModal>

            <Buttons
              variant="outline"
              color="neutral"
              size="figma"
              className="mt-4 w-full gap-[10px] rounded-[16px] border-zinc-200 bg-white p-[10px] whitespace-nowrap text-zinc-900 hover:bg-white"
              leftIcon={<LikeActiveIcon className="h-5 w-5" />}
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
                <ShareClipIcon className="h-16 w-16" />
              </button>

              {/* 카카오 공유 */}
              <button
                type="button"
                aria-label="카카오 공유"
                className={shareBtn}
                onClick={() => shareToKakao()}
              >
                <ShareKakaoIcon className="h-16 w-16" />
              </button>

              {/* 페이스북 공유 */}
              <button
                type="button"
                aria-label="페이스북 공유"
                className={shareBtn}
                onClick={() => shareToFacebook()}
              >
                <ShareFacebookIcon className="h-16 w-16" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
