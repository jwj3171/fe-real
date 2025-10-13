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
  // console.log("🚀 [SERVER] MoverRequestPage 시작됨");

  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  // console.log("🧩 [SERVER] accessToken:", accessToken);
  const queryClient = new QueryClient();
  const initialFilters = { page: 1, pageSize: 10 };
  const queryKey = [
    "moveRequests",
    initialFilters.page,
    initialFilters.pageSize,
    // initialFilters,
  ];

  // console.log("📡 [SERVER] prefetchInfiniteQuery 실행 직전");
  // 서버에서 첫 페이지 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchMoveRequests(
        { page: pageParam, pageSize: initialFilters.pageSize },
        accessToken,
      ),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
  // console.log("✅ [SERVER] prefetchInfiniteQuery 완료");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MoverRequestList
        initialPage={initialFilters.page}
        initialPageSize={initialFilters.pageSize}
        initialFilters={initialFilters}
        accessToken={accessToken}
      />
    </HydrationBoundary>
  );
}
