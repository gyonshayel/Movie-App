import { Link } from "react-router";
import { MovieCard } from "../../components/MovieCard";
import { useWatchLater } from "../../context/WatchLaterContext";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";
import { BookmarkIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export function WatchListPage() {
  const { watchLaterList } = useWatchLater();

  if (watchLaterList.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookmarkIcon className="[svg]:fill-blue-500 [svg]:stroke-blue-500" />
          </EmptyMedia>
          <EmptyTitle>Watch List Empty</EmptyTitle>
          <EmptyDescription>
            Browse movies and save them for later!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to={"/"}>
            <Button variant="outline" size="sm">
              Browse
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <section className="container pb-8">
      <h2 className="text-2xl lg:text-3xl font-medium">Watch List</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(125px,150px))] justify-center lg:justify-start gap-2 lg:gap-3 py-2 lg:py-4">
        {watchLaterList.map((item, index) => {
          return (
            <MovieCard
              key={index}
              movieId={item.id}
              name={item.name}
              year={item.year}
              poster={item.poster}
            />
          );
        })}
      </div>
    </section>
  );
}
