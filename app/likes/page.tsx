"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  deleteAllLikes,
  deleteLike,
  getCustomerLikes,
  toggleLike,
  type Like,
} from "@/lib/api/likes";
import { Buttons } from "@/components/common/button";
import { HeartFilled } from "@/components/common/button/icons";
import CardMoverCheckable from "./components/CardMoverCheckable";
import SquareCheckBox from "./components/SquareCheckBox";
import { useAlertModal } from "@/components/common/modal/AlertModal";

/** 문자열/숫자/null 안전 변환 */
function toNum(v: unknown, fallback = 0) {
  if (v == null) return fallback;
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const n = parseInt(v.replace(/[^\d.-]/g, ""), 10);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

/** API 응답 Like -> CardMoverCheckable 에 필요한 형태로 바로 매핑 */
function normalize(like: Like) {
  const m = like.mover;
  const moverId = m.id;
  const driverName = (m.nickname ?? m.name ?? "이사 기사님").trim();
  const introduction = (m.introduction ?? "").trim();
  const description =
    m.description.length < 25
      ? m.description
      : m.description.substring(0, 25) + "...";
  const avatarUrl = (m.img ?? "/assets/profile_mover_detail.svg").trim();

  const rating = toNum(m.averageRating, 0);
  const reviewCount = toNum(m.totalReviews, 0);
  const careerYears = toNum(m.career, 0);
  const confirmedCount = toNum(m._count.quotes, 0);
  const likeCount = toNum(m._count.likes, 0);
  const services = (m.moverServiceTypes as any[]) ?? [];

  return {
    moverId,
    driverName,
    introduction,
    description,
    avatarUrl,
    rating,
    reviewCount,
    careerYears,
    confirmedCount,
    likeCount,
    services,
  };
}

export default function LikesPage() {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLikes, setSelectedLikes] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const { alert, Modal } = useAlertModal();

  const fetchLikes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomerLikes();
      setLikes(data);
    } catch (err) {
      console.error("좋아요 목록 조회 오류:", err);
      setError("좋아요 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 개별 체크박스 토글
  const handleLikeCheck = (likeId: number, checked: boolean) => {
    setSelectedLikes((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(likeId);
      } else {
        newSet.delete(likeId);
      }
      return newSet;
    });
  };

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allLikeIds = likes.map((like) => like.id);
      setSelectedLikes(new Set(allLikeIds));
    } else {
      setSelectedLikes(new Set());
    }
  };

  // 선택된 항목 삭제 (실제 삭제는 구현하지 않음)
  const handleDeleteSelected = async () => {
    if (selectedLikes.size === 0) {
      alert({ title: "오류", message: "삭제할 항목을 선택해주세요." });
      return;
    }

    const selectedCount = selectedLikes.size;
    if (confirm(`선택된 ${selectedCount}개 항목을 삭제하시겠습니까?`)) {
      await deleteAllLikes(Array.from(selectedLikes));
      setLikes((prev) => prev.filter((like) => !selectedLikes.has(like.id)));
      setSelectedLikes(new Set());
      setSelectAll(false);
      alert({
        title: "삭제 성공",
        message: `${selectedCount}개 항목이 삭제되었습니다.`,
      });
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <div className="text-lg text-gray-600">불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <div className="mb-4 text-lg text-red-600">{error}</div>
            <Buttons onClick={fetchLikes}>다시 시도</Buttons>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">찜한 기사님</h1>
          <p className="text-gray-600">
            마음에 드는 기사님을 찜해두고 쉽게 찾아보세요.
          </p>
          <div className="mt-4 flex flex-row justify-between border-t border-gray-200 pt-4 pb-4">
            <div className="flex flex-row items-center gap-1">
              <div>전체 선택</div>
              <SquareCheckBox checked={selectAll} onChange={handleSelectAll} />
            </div>
            <button
              onClick={handleDeleteSelected}
              className="font-medium text-red-600 hover:text-red-800"
            >
              선택 항목 삭제
            </button>
          </div>
        </div>
        {likes.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
            <div className="mb-4 text-gray-500">
              <HeartFilled className="mx-auto h-12 w-12 text-gray-300" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              아직 찜한 기사님이 없어요
            </h3>
            <p className="mb-6 text-gray-600">
              마음에 드는 기사님을 찾아서 찜해보세요!
            </p>
            <Link href="/search">
              <Buttons>기사님 찾아보기</Buttons>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {likes.map((like) => {
              const normalized = normalize(like);
              const moverId = like.mover.id;

              return (
                <div key={like.id} className="relative block">
                  <CardMoverCheckable
                    {...normalized}
                    checked={selectedLikes.has(like.id)}
                    onCheckChange={(checked) =>
                      handleLikeCheck(like.id, checked)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
}
