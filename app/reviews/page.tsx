"use client";

import { useState, useEffect } from "react";
import { useWritableReviewCards } from "@/hooks/useWritableReviewCards";
import { useWrittenReviewCards } from "@/hooks/useWrittenReviewCards";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";

type TabKey = "writable" | "written";

const CONTAINER = "mx-auto w-full max-w-6xl px-4";
const TABS: { key: TabKey; label: string }[] = [
  { key: "writable", label: "작성 가능한 리뷰" },
  { key: "written", label: "내가 작성한 리뷰" },
];

export default function ReviewsPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<TabKey>("writable");

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* 탭 */}
      <div className="-mt-px border-t border-gray-200 bg-white">
        <div className={CONTAINER}>
          <nav className="flex gap-12">
            {TABS.map((t) => {
              const on = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-current={on ? "page" : undefined}
                  className={`relative cursor-pointer py-6 text-[17px] font-semibold ${
                    on ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="relative inline-block pb-2">
                    {t.label}
                    {on && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full bg-gray-900" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 내용 */}
      <section className="w-full bg-gray-50">
        <div className={`${CONTAINER} pt-6 pb-12`}>
          {active === "writable" ? <WritableReviews /> : <WrittenReviews />}
        </div>
      </section>
    </>
  );
}

/* ----------------------------- 작성 가능한 리뷰 ----------------------------- */
function WritableReviews() {
  const { items, isLoading } = useWritableReviewCards();

  console.log("🟢 WritableReviews items:", items);
  console.log("🟢 WritableReviews isLoading:", isLoading);

  if (isLoading) return <div className="p-6">불러오는 중…</div>;
  if (!items.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
        작성 가능한 리뷰가 없습니다.
      </div>
    );

  return (
    <ul className="space-y-4">
      {items.map((it: any) => (
        <li key={it.id}>
          <ReviewWriteCard
            moverName={it.moverName}
            moverAvatarUrl={it.moverAvatarUrl}
            serviceLabel={it.serviceLabel}
            from={it.from}
            to={it.to}
            moveDate={it.moveDate}
            price={it.price}
          />
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------- 내가 작성한 리뷰 ----------------------------- */
function WrittenReviews() {
  const { items, isLoading } = useWrittenReviewCards();

  console.log("🟣 WrittenReviews items:", items);
  console.log("🟣 WrittenReviews isLoading:", isLoading);

  if (isLoading) return <div className="p-6">불러오는 중…</div>;
  if (!items.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
        아직 작성한 리뷰가 없습니다.
      </div>
    );

  return (
    <ul className="space-y-4">
      {items.map((it: any) => (
        <li key={it.reviewId ?? it.bookingId}>
          <ReviewWriteCard
            moverName={it.moverName}
            moverAvatarUrl={it.moverAvatarUrl}
            serviceLabel={it.serviceLabel}
            from={it.from}
            to={it.to}
            moveDate={it.moveDate}
            price={it.price}
          />
          <div className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            <div className="mb-1 text-gray-500">
              내 리뷰 {it.createdAt ? `(${it.createdAt})` : ""}
            </div>
            <div>⭐ {it.rating ?? 0} / 5</div>
            <div className="mt-1 whitespace-pre-wrap">{it.content ?? ""}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
