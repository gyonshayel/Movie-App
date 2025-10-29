import { MovieCardSkeleton } from "./MovieCardSkeleton";
import { Skeleton } from "./ui/skeleton";

export function MovieCardSkeletonList({ count = 10 }) {
  return (
    <div>
      <Skeleton className="h-6 w-[150px]" />
      <div className="flex overflow-x-auto gap-2 lg:gap-3 px-2 py-2 scrollbar-hide">
        {Array.from({ length: count }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
