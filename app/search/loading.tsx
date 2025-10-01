export default function Loading() {
  return (
    <main className="mx-auto max-w-[1120px] px-6 py-8">
      <div className="mb-6 h-6 w-40 animate-pulse rounded-md bg-zinc-200" />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="h-10 min-w-[240px] flex-1 animate-pulse rounded-xl bg-zinc-200" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[130px] animate-pulse rounded-xl border border-zinc-200 bg-white"
          />
        ))}
      </div>
    </main>
  );
}
