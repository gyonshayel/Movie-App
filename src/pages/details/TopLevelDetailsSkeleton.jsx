import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../../components/ui/badge";

export function TopLevelDetailsSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 lg:gap-6 animate-in fade-in duration-300">
      {/* Poster */}
      <div>
        <Skeleton className="min-w-[125px] lg:min-w-[150px] max-w-[150px] aspect-[2/3] rounded-md" />
      </div>

      {/* Movie info */}
      <div className="flex flex-col gap-2 lg:gap-2">
        {/* Title + Year */}
        <Skeleton className="h-6 lg:h-8 w-5/6 rounded" />
        <Skeleton className="h-4 lg:h-5 w-1/3 rounded" />

        {/* Genres */}
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-16 rounded-full" />
          ))}
        </div>

        {/* Rating Badge */}
        <Badge
          variant="outline"
          className="text-lg py-[3px] flex items-center gap-1"
        >
          <Skeleton className="h-5 w-20 rounded" />
        </Badge>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Accordion (Overview placeholder) */}
      <div className="col-span-2 border-2 border-border rounded-4xl px-4 py-4 mt-2">
        <Skeleton className="h-7 lg:h-8 w-1/4 mb-3 rounded" />{" "}
        {/* Overview title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-11/12 rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      </div>
    </div>
  );
}
