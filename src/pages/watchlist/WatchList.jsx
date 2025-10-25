import { MovieCard } from "../../components/MovieCard";
import { useWatchLater } from "../../context/WatchLaterContext";

export function WatchList() {
  const { watchLaterList } = useWatchLater();

  if (watchLaterList.length === 0) {
    return <p className="text-center mt-6">No movies in Watch Later list.</p>;
  }

  return (
    <div className="flex overflow-x-scroll gap-1.5 mt-2 mb-4 py-4">
      {watchLaterList.map((item) => {
        return (
          <MovieCard
            key={item.id}
            movieId={item.id}
            name={item.name}
            year={item.year}
            poster={item.poster}
          />
        );
      })}
    </div>
  );
}
