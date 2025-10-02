// app/moverRequest/page.tsx (Server Component)
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchMoveRequests } from "@/lib/api/moveRequest";
import MoverRequestList from "./moverRequestList";
import { cookies } from "next/headers";

export default async function MoverRequestPage() {
  const cookieStore = cookies();
  const accessToken =  (await cookieStore).get("accessToken")?.value;

  const queryClient = new QueryClient();
  const initialFilters = { page: 1, pageSize: 5 };
  const queryKey =["moveRequests",initialFilters.page,initialFilters.pageSize]

  // 서버에서 첫 페이지 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests({ ...initialFilters, page: pageParam }, accessToken),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoverRequestList initialFilters={initialFilters} accessToken={accessToken}/>
    </HydrationBoundary>
  );
}
