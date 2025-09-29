import QuotesClient from "./quotes.client.tsx";

export default async function Page({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  return <QuotesClient requestId={Number(requestId)} />;
}
