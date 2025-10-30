import Image from "next/image";

interface EstimateStatusProps {
  status: "confirmed" | "waiting";
  className?: string;
  size?: number;
}

export default function EstimateStatus({
  status,
  className,
  size = 18,
}: EstimateStatusProps) {
  if (status === "confirmed") {
    return (
      <div className="ml-2 flex items-center gap-1">
        <Image
          src="/icons/ic_check.svg"
          alt="확정 아이콘"
          width={size}
          height={size}
        />
        <span className="text-sm font-medium text-red-500">확정견적</span>
      </div>
    );
  }

  if (status === "waiting") {
    return (
      <span className="ml-2 text-sm font-medium text-gray-400">견적대기</span>
    );
  }

  return null;
}
