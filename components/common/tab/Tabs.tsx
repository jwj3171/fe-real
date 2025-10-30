"use client";
import type { TabValue } from "@/store/estimatesTabStore";

export function Tabs({
  value,
  onChange,
  labels = { active: "대기 중", confirmed: "확정됨", expired: "기한 만료" },
  counts,
}: {
  value: TabValue;
  onChange: (next: TabValue) => void;
  labels?: { active: string; confirmed: string; expired: string };
  counts?: { active?: number; confirmed?: number; expired?: number };
}) {
  return (
    <div className="border-b">
      <div
        role="tablist"
        aria-label="내 이사요청 상태"
        className="mt-3 flex items-center gap-2 sm:mt-0 sm:gap-6"
      >
        <TabButton
          active={value === "active"}
          onClick={() => onChange("active")}
        >
          {labels.active}
          {counts?.active !== undefined && <Badge>{counts.active}</Badge>}
        </TabButton>
        <TabButton
          active={value === "confirmed"}
          onClick={() => onChange("confirmed")}
        >
          {labels.confirmed}
          {counts?.confirmed !== undefined && <Badge>{counts.confirmed}</Badge>}
        </TabButton>
        <TabButton
          active={value === "expired"}
          onClick={() => onChange("expired")}
        >
          {labels.expired}
          {counts?.expired !== undefined && <Badge>{counts.expired}</Badge>}
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
        "mb-[4px] flex items-center px-3 py-2 text-[15px] font-bold sm:mb-[10px] sm:text-[20px]",
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
    <span className="ml-0.5 inline-flex items-center rounded-full bg-[#ff3d2e] px-2 py-0.5 text-[10px] text-[var(--color-white)] sm:ml-1 sm:text-[12px]">
      {children}
    </span>
  );
}
