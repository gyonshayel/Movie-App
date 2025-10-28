import { MovieCard } from "../../components/MovieCard";
import { useWatchLater } from "../../context/WatchLaterContext";

export function WatchListPage() {
  const { watchLaterList } = useWatchLater();

  if (watchLaterList.length === 0) {
    return <p className="text-center mt-6">No movies in your Watch List</p>;
  }

  return (
    <section className="container pb-8">
      <h2 className="text-2xl lg:text-3xl font-medium">Watch List</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(125px,150px))] justify-center gap-2 lg:gap-3 py-2 lg:py-4">
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
