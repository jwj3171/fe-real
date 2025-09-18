// import { Button, IconButton } from "@/components/common/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import {
  Button,
  IconButton,
  LikeButton,
  LinkCopyButton,
  KakaoShareButton,
  FacebookShareButton,
  HeartOutline,
} from "@/components/common/button";

export default function Home() {
  const [liked, setLiked] = useState(false);

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-10">
      <h1 className="text-2xl font-bold">Buttons Quick Test</h1>

      {/* 1) Solid */}
      <section className="space-y-3">
        <h2 className="font-semibold">Solid</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="xl">
            Primary CTA 버튼
          </Button>
          <Button variant="solid" color="danger">
            Danger
          </Button>
          <Button variant="solid" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* 2) Outline (state 차이) */}
      <section className="space-y-3">
        <h2 className="font-semibold">Outline</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" state="default">
            default
          </Button>
          <Button variant="outline" state="active">
            active
          </Button>
          <Button variant="outline" state="done">
            done
          </Button>
        </div>
      </section>

      {/* 3) Ghost + 좌/우 아이콘 */}
      <section className="space-y-3">
        <h2 className="font-semibold">Ghost</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="ghost"
            leftIcon={<HeartOutline className="h-5 w-5" />}
          >
            왼쪽 아이콘
          </Button>
          <Button
            variant="ghost"
            rightIcon={<HeartOutline className="h-5 w-5" />}
          >
            오른쪽 아이콘
          </Button>
        </div>
      </section>

      {/* 4) Icon / Like */}
      <section className="space-y-3">
        <h2 className="font-semibold">Icon / Like</h2>
        <div className="flex items-center gap-3">
          <IconButton variant="outline" color="primary" rounded="full">
            <HeartOutline className="h-5 w-5" />
          </IconButton>
          <LikeButton filled={liked} onClick={() => setLiked((v) => !v)} />
        </div>
      </section>

      {/* 5) 공유 & 링크복사 */}
      <section className="space-y-3">
        <h2 className="font-semibold">Share & Copy</h2>
        <div className="flex items-center gap-3">
          <LinkCopyButton onCopied={() => alert("링크가 복사되었습니다.")} />
          <KakaoShareButton onClick={() => alert("카카오 공유 클릭")} />
          <FacebookShareButton onClick={() => alert("페북 공유 클릭")} />
        </div>
      </section>
    </main>
  );
}
