import { MovieCard } from "../../components/MovieCard";

export function Favorites() {
  const arr = localStorage.getItem("favoritesArray");
  const favoritesArray = arr ? JSON.parse(arr) : [];

  if (favoritesArray.length === 0) {
    return <p className="text-center mt-6">No movies in your favorites.</p>;
  }

  return (
    <div className="flex overflow-x-scroll gap-1.5 mt-2 mb-4 py-4">
      {favoritesArray.map((item) => {
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
