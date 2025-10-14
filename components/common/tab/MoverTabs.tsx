"use client";
import type { MoverTab } from "@/store/moverQuoteTabStore";

export function MoverTabs({
  value,
  onChange,
  counts,
}: {
  value: MoverTab;
  onChange: (t: MoverTab) => void;
  counts?: { normal?: number; direct?: number };
}) {
  return (
    <div className="border-b">
      <div
        role="tablist"
        aria-label="기사 이사요청 유형"
        className="flex gap-6"
      >
        <TabButton
          active={value === "normal"}
          onClick={() => onChange("normal")}
        >
          일반 요청
          {counts?.normal !== undefined && <Badge>{counts.normal}</Badge>}
        </TabButton>
        <TabButton
          active={value === "direct"}
          onClick={() => onChange("direct")}
        >
          지정 요청
          {counts?.direct !== undefined && <Badge>{counts.direct}</Badge>}
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
        "mb-2 flex items-center px-3 py-2 text-lg font-medium",
        "border-b-2 border-transparent text-gray-400 hover:text-gray-700",
        "data-[active=true]:text-black",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
      {children}
    </span>
  );
}
