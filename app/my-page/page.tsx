"use client";

import { Buttons } from "@/components/common/button";
import MoverHero from "@/components/MoverHero";
import { useMe } from "@/hooks/useAuth";
import { getMoverDetail } from "@/lib/api/mover";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: me } = useMe();
  const [mover, setMover] = useState({});

  useEffect(() => {
    if (me) {
      console.log(me);
      const getData = async () => {
        const result = await getMoverDetail(me?.id || 0);
        setMover(result);
      };
      getData();
    }
  }, [me]);

  console.log(mover);

  if (Object.keys(mover).length === 0) return <div>Loading...</div>;
  return (
    <>
      <div className="flex w-[283px] flex-col gap-4">
        <Buttons href="/my-page/edit" className="h-16 w-full p-4">
          <div className="flex flex-row gap-1.5">
            내 프로필 수정
            <Image
              src={"/icons/ic_writing.svg"}
              width={24}
              height={24}
              alt="프로필 수정"
            />
          </div>
        </Buttons>
        <Buttons
          href="/profile/edit/mover"
          color="neutral"
          variant="outline"
          className="h-16 w-full p-4"
        >
          <div className="flex flex-row gap-1.5">
            기본 정보 수정
            <Image
              className="brightness-0 saturate-100"
              src={"/icons/ic_writing.svg"}
              width={24}
              height={24}
              alt="기본 정보 수정"
            />
          </div>
        </Buttons>
      </div>
      <MoverHero mover={mover} />
    </>
  );
}
