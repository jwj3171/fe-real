import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getQuoteDetailForMoverServer } from "@/lib/quoteApi";
import MoverQuoteDetailClient from "./MoverQuoteDetail.client";

export default async function Page({
  params,
}: {
  params: Promise<{ quoteId: string }>;
}) {
  const { quoteId } = await params;
  const idNum = Number.parseInt(quoteId, 10);

  if (!Number.isFinite(idNum)) {
    return (
      <div className="p-6 text-red-600">
        잘못된 경로입니다. (quoteId가 숫자가 아님)
      </div>
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const detail = await getQuoteDetailForMoverServer(idNum, token);
    if (!detail) notFound();
    return <MoverQuoteDetailClient detail={detail} />;
  } catch (e: any) {
    const msg =
      e?.response?.data?.message ||
      e?.message ||
      "견적 상세 조회 중 오류가 발생했습니다.";
    return <div className="p-6 text-red-600">{msg}</div>;
  }
}
