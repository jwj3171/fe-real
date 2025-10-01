"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import _SearchInput from "@/components/common/input/SearchInput";

// TS 타입 충돌 우회: 팀 공용 컴포넌트는 그대로 두고, 우리쪽에서만 any 캐스팅
const SearchInput = _SearchInput as unknown as React.ComponentType<any>;

export default function SearchRow({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const applyQuery = (value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set("q", value);
    else next.delete("q");
    next.set("page", "1");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-2xl bg-zinc-100/70 p-0">
      <SearchInput
        // 팀 컴포넌트가 어떤 이름을 쓰는지 몰라도 안전하게 다 전달
        placeholder="텍스트를 입력해 주세요."
        className="h-14 w-full rounded-2xl bg-transparent px-4"
        defaultValue={initialQuery} // 지원하면 사용, 아니면 무시
        value={undefined} // value/ onChange 조합도 지원 시 대비
        onChange={undefined}
        onSearch={(v: string) => applyQuery(v)}
        onSubmit={(v: string) => applyQuery(v)}
        onEnter={(v: string) => applyQuery(v)}
        onClickSearch={(v: string) => applyQuery(v)}
      />
    </div>
  );
}
