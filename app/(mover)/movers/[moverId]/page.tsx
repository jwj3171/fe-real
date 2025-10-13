import { Buttons } from "@/components/common/button";
import BaseModal from "@/components/common/modal/DirectModal";
import RequestList from "./components/RequestList";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ moverId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { moverId } = await params;
  const sp = await searchParams;

  return (
    <>
      <BaseModal
        title="지정 견적 요청하기"
        trigger={<Buttons>{"지정 견적 요청하기"}</Buttons>}
      >
        <RequestList moverId={Number(moverId)} />
      </BaseModal>
    </>
  );
}
