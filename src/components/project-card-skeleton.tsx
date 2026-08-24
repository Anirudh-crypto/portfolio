/** Placeholder matching `ProjectCard`'s footprint, so loading states don't shift layout. */
export const ProjectCardSkeleton = () => (
  <div className="surface-card flex h-full animate-pulse flex-col p-6">
    <div className="h-7 w-3/4 rounded bg-muted" />
    <div className="mt-4 space-y-2">
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-11/12 rounded bg-muted" />
      <div className="h-3 w-2/3 rounded bg-muted" />
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <div className="h-6 w-16 rounded-full bg-muted" />
      <div className="h-6 w-20 rounded-full bg-muted" />
      <div className="h-6 w-14 rounded-full bg-muted" />
    </div>
    <div className="mt-8 h-9 w-32 rounded-full bg-muted" />
  </div>
);

export const ProjectGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }, (_, index) => (
      <ProjectCardSkeleton key={index} />
    ))}
  </div>
);
