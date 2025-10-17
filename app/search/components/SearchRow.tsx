"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchRow() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // URL -> input 초기값
  const init = (sp.get("q") ?? "") as string;
  const [value, setValue] = React.useState(init);

  // 디바운스 적용으로 입력 후 잠깐 뒤 URL 동기화
  React.useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(sp.toString());
      const v = value.trim();
      v ? next.set("q", v) : next.delete("q");
      next.set("page", "1"); // 검색 바뀌면 1페이지
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const next = new URLSearchParams(sp.toString());
      const v = value.trim();
      v ? next.set("q", v) : next.delete("q");
      next.set("page", "1");
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="텍스트를 입력해 주세요."
        className="h-12 w-full rounded-xl border border-transparent bg-white pr-10 pl-12 ring-0 outline-none focus:border-zinc-200"
      />
      {/* 검색 아이콘 */}
      <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400">
        🔍
      </span>

      {/* 지우기 버튼 */}
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-zinc-200 px-2 text-sm text-zinc-700"
        >
          지우기
        </button>
      )}
    </div>
  );
}
