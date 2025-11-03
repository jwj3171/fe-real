"use client";
import * as React from "react";

export function MoverTabs({
  value,
  onChange,
  counts,
}: {
  value: "normal" | "direct";
  onChange: (next: "normal" | "direct") => void;
  counts?: { normal?: number; direct?: number };
}) {
  return (
    <div className="border-b">
      <div role="tablist" aria-label="이사 요청 종류" className="flex gap-6">
        <TabButton
          active={value === "normal"}
          onClick={() => onChange("normal")}
        >
          일반 요청
        </TabButton>
        <TabButton
          active={value === "direct"}
          onClick={() => onChange("direct")}
        >
          지정 요청
        </TabButton>
      </div>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      data-active={active ? "true" : "false"}
      onClick={onClick}
      className={[
        "mb-0 flex items-center p-2 text-[18px] font-bold sm:text-[20px]",
        "border-b-2 border-transparent text-gray-400 hover:text-gray-700",
        "data-[active=true]:text-black",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
