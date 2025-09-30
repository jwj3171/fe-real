export function Tabs({
  value,
  onChange,
}: {
  value: "active" | "closed";
  onChange: (next: "active" | "closed") => void;
}) {
  return (
    <div className="border-b">
      <div role="tablist" aria-label="내 이사요청 상태" className="flex gap-6">
        <TabButton
          active={value === "active"}
          onClick={() => onChange("active")}
        >
          대기 중인 견적
        </TabButton>
        <TabButton
          active={value === "closed"}
          onClick={() => onChange("closed")}
        >
          종료된 견적
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
        "relative -mb-2 px-3 py-2 text-sm font-medium",
        "border-b-2 border-transparent text-gray-500 hover:text-gray-700",
        "data-[active=true]:text-black",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
