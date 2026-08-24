/** Placeholder matching `EpisodeCard`'s footprint, so loading states don't shift layout. */
export const EpisodeCardSkeleton = () => (
  <div className="grid gap-5 sm:grid-cols-[96px_1fr] lg:grid-cols-[126px_1fr] lg:gap-6">
    <div className="hidden sm:block" />
    <div className="hard animate-pulse overflow-hidden bg-card">
      <div className="h-[15px] border-b-[3px] border-foreground bg-muted" />
      <div className="p-6 sm:p-7">
        <div className="h-6 w-28 bg-muted" />
        <div className="mt-4 h-8 w-3/4 bg-muted" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full bg-muted" />
          <div className="h-3 w-11/12 bg-muted" />
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-7 w-16 bg-muted" />
          <div className="h-7 w-20 bg-muted" />
          <div className="h-7 w-14 bg-muted" />
        </div>
      </div>
    </div>
  </div>
);

export const EpisodeListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-col gap-10 lg:gap-12">
    {Array.from({ length: count }, (_, index) => (
      <EpisodeCardSkeleton key={index} />
    ))}
  </div>
);
