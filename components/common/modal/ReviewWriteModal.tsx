"use client";

import * as React from "react";
import BaseModal from "./BaseModal"; // ← 기존 베이스 모달 그대로 사용

// 카드/칩/아바타 등 공용 컴포넌트
import MoverAvatar from "../../common/card/Mover/MoverAvatar";
import MoverName from "../../common/card/Mover/MoverName";
import CardDateInfo from "../../common/card/CardDateInfo";
import CardRouteInfo from "../../common/card/CardRouteInfo";
import { SmallMoveChip, DesignatedQuoteChip } from "../chip/presets";

// 별점 전용 컴포넌트
import RatingStars from "../rating/RatingStars";

// 버튼 (네가 만든 공용 버튼)
import { Buttons } from "../../common/button"; // 경로는 프로젝트 기준에 맞춰 조정

/* ----------------------------- props ----------------------------- */
type MoveType = "small" | "designated";

export interface ReviewWriteModalProps {
  /** 모달 열 트리거 (버튼 등) */
  trigger: React.ReactNode;

  /** 기사 정보 */
  moverName: string;
  moverAvatarSrc?: string;

  /** 이사 유형 뱃지 노출용 */
  moveTypes?: MoveType[]; // ['small','designated'] 등

  /** 경로/일정 */
  fromAddress: string;
  toAddress: string;
  moveDateText: string;

  /** 별점/리뷰 */
  rating: number;
  onChangeRating: (n: number) => void;
  reviewText: string;
  onChangeReviewText: (v: string) => void;

  /** 등록 버튼 */
  onSubmit: () => void;
  submitting?: boolean;

  /** 모달 컨텐츠 외부 클래스 */
  className?: string;
}

/* --------------------------- component --------------------------- */
export default function ReviewWriteModal({
  trigger,
  moverName,
  moverAvatarSrc,
  moveTypes = [],
  fromAddress,
  toAddress,
  moveDateText,
  rating,
  onChangeRating,
  reviewText,
  onChangeReviewText,
  onSubmit,
  submitting = false,
  className,
}: ReviewWriteModalProps) {
  return (
    <BaseModal
      trigger={trigger}
      title="리뷰 쓰기"
      className={className}
      // description은 필요 없으면 넘기지 않아도 됨
    >
      {/* ---------------- 상단 : 칩/이사유형/아바타/이름 ---------------- */}
      <header className="mb-4">
        {/* 칩(이사유형) */}
        <div className="flex items-center gap-2 mb-3">
          {moveTypes.includes("small") && (
            <SmallMoveChip size="sm">소형이사</SmallMoveChip>
          )}
          {moveTypes.includes("designated") && (
            <DesignatedQuoteChip size="sm">지정 견적 요청</DesignatedQuoteChip>
          )}
        </div>

        {/* 기사 이름 + 아바타 */}
        <div className="flex items-center justify-between">
          <MoverName MoverName={moverName} />
          <MoverAvatar
            avatarUrl={moverAvatarSrc}
            size={56}
            className="w-14 h-14 rounded-xl"
          />
        </div>
      </header>

      <hr className="my-4 border-gray-200" />

      {/* ---------------- 경로/일정 정보 ---------------- */}
      <section className="grid grid-cols-3 gap-6 mb-4">
        <div>
          <CardRouteInfo from={fromAddress} to="" showArrow={false} />
        </div>

        <div>
          <CardRouteInfo from="" to={toAddress} showArrow={false} />
        </div>

        <div>
          <CardDateInfo movingDate={moveDateText} />
        </div>
      </section>

      <hr className="my-4 border-gray-200" />

      {/* ---------------- 별점 ---------------- */}
      <section className="mb-4">
        <p className="text-base font-semibold mb-2">평점을 선택해 주세요</p>
        <RatingStars
          value={rating}
          onChange={onChangeRating}
          size={28}
          gap={12}
          className="mt-1"
        />
      </section>

      {/* ---------------- 텍스트 리뷰 ---------------- */}
      <section className="mb-6">
        <p className="text-base font-semibold mb-2">
          상세 후기를 작성해 주세요
        </p>
        <textarea
          className="w-full min-h-[160px] rounded-xl border border-gray-200 p-4 outline-none focus:border-primary-400"
          placeholder="최소 10자 이상 입력해주세요"
          value={reviewText}
          onChange={(e) => onChangeReviewText(e.target.value)}
        />
      </section>

      {/* ---------------- 등록 버튼 ---------------- */}
      <div className="pt-2">
        <Buttons
          variant="solid"
          color="primary"
          size="lg"
          fullWidth
          disabled={submitting || reviewText.trim().length < 10 || rating === 0}
          onClick={onSubmit}
        >
          리뷰 등록
        </Buttons>
      </div>
    </BaseModal>
  );
}
