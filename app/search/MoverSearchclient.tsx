"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useMoverListPage } from "@/hooks/useMovers";
import { useMoverSearchStore } from "@/store/moverSearchStore";
import { getMoverList } from "@/lib/api/mover";
import Grid from "./components/Grid";

type Props = {
  initialParams: {
    q?: string;
    region?: string;
    service?: string;
    sort?: "reviews" | "rating" | "career" | "quotes";
    page?: number;
  };
};

export default function MoverSearchClient({ initialParams }: Props) {
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

  // 1) URL → 스토어 초기 동기화
  useEffect(() => {
    setQ((sp.get("q") ?? initialParams.q ?? "") as string);
    setRegion(
      (sp.get("region") ?? initialParams.region ?? null) as string | null,
    );
    setService(
      (sp.get("service") ?? initialParams.service ?? null) as string | null,
    );
    setSort((sp.get("sort") ?? initialParams.sort ?? "reviews") as any);
    setPage(Number(sp.get("page") ?? initialParams.page ?? 1) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) 스토어 → URL 동기화
  useEffect(() => {
    const next = new URLSearchParams(sp.toString());
    q ? next.set("q", q) : next.delete("q");
    region ? next.set("region", region) : next.delete("region");
    service ? next.set("service", service) : next.delete("service");
    sort ? next.set("sort", sort) : next.delete("sort");
    next.set("page", String(page));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [q, region, service, sort, page, pathname, router, sp]);

  // 3) 데이터 패칭
  const { data, isFetching } = useMoverListPage({
    q: q || undefined,
    region: region || undefined,
    serviceType: service || undefined,
    sortBy: sort,
    page,
    perPage: 10,
  });

  // 4) 다음 페이지 프리패치 (정적 import 사용)
  useEffect(() => {
    if (!data?.totalPages) return;
    const next = page + 1;
    if (next > data.totalPages) return;

    qc.prefetchQuery({
      queryKey: [
        "mover-list",
        {
          q: q || undefined,
          region: region || undefined,
          serviceType: service || undefined,
          sortBy: sort,
          page: next,
          perPage: 10,
        },
      ],
      queryFn: () =>
        getMoverList({
          q: q || undefined,
          region: region || undefined,
          serviceType: service || undefined,
          sortBy: sort,
          page: next,
          perPage: 10,
        }),
    });
  }, [qc, data?.totalPages, page, q, region, service, sort]);

  if (!data) return null;

  return (
    <div>
      <Grid
        items={data.items}
        page={data.page}
        totalPages={data.totalPages ?? 1}
        isFetching={isFetching}
        onPrev={() => setPage(Math.max(1, page - 1))}
        onNext={() =>
          setPage(
            data.totalPages ? Math.min(data.totalPages, page + 1) : page + 1,
          )
        }
      />
    </div>
  );
}
