import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <Card className="group relative gap-0.5 p-1 lg:p-2 min-w-[125px] lg:min-w-[150px] max-w-[150px]">
      <CardContent className="p-0.5">
        <Skeleton className="w-full aspect-[2/3] rounded-md" />
      </CardContent>
      <CardHeader className="grid-rows-[1fr_auto] gap-0 lg:gap-1 p-0">
        <Skeleton className="h-4 lg:h-5 w-3/4 mt-1 rounded" />
        <Skeleton className="h-3 lg:h-4 w-1/3 rounded" />
      </CardHeader>
    </Card>
  );
}
