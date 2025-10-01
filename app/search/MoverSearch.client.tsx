"use client";

import { useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getMoverList,
  type MoverListPage,
  type MoverListParams,
} from "../../lib/MoverSearchApi";
import { useMoverSearchStore } from "@/store/moverSearchStore";
import FilterBar from "./components/FilterBar";
import Grid from "./components/Grid";

export default function MoverSearch({
  initial,
  initialParams,
}: {
  initial: MoverListPage;
  initialParams: MoverListParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qc = useQueryClient();

  const {
    q,
    region,
    service,
    sort,
    page,
    setQ,
    setRegion,
    setService,
    setSort,
    setPage,
  } = useMoverSearchStore();

  // URL → store (초기 1회)
  useEffect(() => {
    setQ((sp.get("q") ?? initialParams.q ?? "") as string);
    setRegion((sp.get("region") as string) ?? initialParams.region ?? null);
    setService((sp.get("service") as string) ?? initialParams.service ?? null);
    setSort(
      ((sp.get("sort") as string) ?? initialParams.sort ?? "recent") as any,
    );
    setPage(Number(sp.get("page") ?? initialParams.page ?? 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // store → URL 동기화
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (region) p.set("region", region);
    if (service) p.set("service", service);
    if (sort) p.set("sort", sort);
    if (page > 1) p.set("page", String(page));
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  }, [q, region, service, sort, page, pathname, router]);

  const queryKey = ["mover-list", { q, region, service, sort, page }];

  const { data, isFetching } = useQuery<MoverListPage>({
    queryKey,
    queryFn: () =>
      getMoverList({
        q,
        region: region ?? undefined,
        service: service ?? undefined,
        sort,
        page,
        perPage: 10,
      }),
    placeholderData: keepPreviousData,
    initialData:
      page === (initialParams.page ?? 1) &&
      q === (initialParams.q ?? "") &&
      (region ?? undefined) === initialParams.region &&
      (service ?? undefined) === initialParams.service &&
      sort === (initialParams.sort ?? "recent")
        ? initial
        : undefined,
    staleTime: 15_000,
  });

  // 다음 페이지 프리패치
  useEffect(() => {
    if (!data) return;
    const next = data.page + 1;
    if (next <= data.totalPages) {
      qc.prefetchQuery({
        queryKey: ["mover-list", { q, region, service, sort, page: next }],
        queryFn: () =>
          getMoverList({
            q,
            region: region ?? undefined,
            service: service ?? undefined,
            sort,
            page: next,
            perPage: 10,
          }),
      });
    }
  }, [data, q, region, service, sort, qc]);

  if (!data) return null;

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-6">
      <FilterBar />
      <Grid
        items={data.items}
        page={data.page}
        totalPages={data.totalPages}
        isFetching={isFetching}
        onPrev={() => setPage(Math.max(1, data.page - 1))}
        onNext={() => setPage(Math.min(data.totalPages, data.page + 1))}
      />
    </div>
  );
}
