"use client";
import * as React from "react";
import ReviewWriteModal from "@/components/common/modal/ReviewWriteModal";
import { Buttons } from "@/components/common/button";
import MoverAvatar from "@/components/common/card/Mover/MoverAvatar";
import { useAlertModal } from "@/components/common/modal/AlertModal";

export default function Home() {
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState("");
  const { alert, Modal } = useAlertModal();

  return (
    <main className="p-10">
      <ReviewWriteModal
        trigger={<Buttons variant="solid">리뷰 쓰기</Buttons>}
        moverName="김코드"
        moverAvatarSrc="/assets/profile.svg"
        moveTypes={["small", "designated"]}
        fromAddress="서울시 중구"
        toAddress="경기도 수원시"
        moveDateText="2024년 07월 01일 (월)"
        rating={rating}
        onChangeRating={setRating}
        reviewText={text}
        onChangeReviewText={setText}
        onSubmit={() => alert({ message: `rating=${rating}\ntext=${text}` })}
      />
      <MoverAvatar className="mt-4" />
      <Modal />
    </main>
  );
}
