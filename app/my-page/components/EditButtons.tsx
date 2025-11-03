import { Buttons } from "@/components/common/button";
import Image from "next/image";

export default function EditButtons() {
  return (
    <div className="flex w-[283px] flex-col gap-4 pt-30">
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
  );
}
