"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCustomerLikes, toggleLike, type Like } from "@/lib/api/likes";
import CardHeaderMover from "@/components/common/card/CardMover";
import { Buttons } from "@/components/common/button";
import { HeartFilled } from "@/components/common/button/icons";

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

/** API 응답 Like -> CardHeaderMover 에 필요한 형태로 바로 매핑 */
function normalize(like: Like) {
  const m = like.mover;
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

  return {
    driverName,
    introduction,
    description,
    avatarUrl,
    rating,
    reviewCount,
    careerYears,
    confirmedCount,
    likeCount,
  };
}

export default function LikesPage() {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleToggleLike = async (moverId: number) => {
    try {
      await toggleLike(moverId);
      // 좋아요 목록에서 제거
      setLikes((prev) => prev.filter((like) => like.mover.id !== moverId));
    } catch (err) {
      console.error("좋아요 토글 오류:", err);
      alert("좋아요 처리 중 오류가 발생했습니다.");
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">찜한 기사님</h1>
          <p className="text-gray-600">
            마음에 드는 기사님을 찜해두고 쉽게 찾아보세요.
          </p>
        </div>

        {/* Likes List */}
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
                <div key={like.id} className="relative">
                  <Link href={`/movers/${moverId}`} className="block">
                    <CardHeaderMover {...normalized} showPrice={false} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
