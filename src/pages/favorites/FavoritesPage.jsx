import { useState, useEffect } from "react";
import { FavoriteMovieCard } from "./FavoriteMovieCard";

export function FavoritesPage() {
  const [favoritesArray, setFavoritesArray] = useState([]);

  useEffect(() => {
    const arr = localStorage.getItem("favoritesArray");
    setFavoritesArray(arr ? JSON.parse(arr) : []);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavoritesArray = favoritesArray.filter(
      (object) => object.id !== movieId
    );
    setFavoritesArray(updatedFavoritesArray);
    localStorage.setItem(
      "favoritesArray",
      JSON.stringify(updatedFavoritesArray)
    );
  };

  if (favoritesArray.length === 0) {
    return <p className="text-center mt-6">No movies in your Favorites</p>;
  }

  return (
    <section className="container pb-8">
      <h2 className="text-2xl lg:text-3xl font-medium">Favorites</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(125px,150px))] justify-center gap-2 lg:gap-3 py-2 lg:py-4">
        {favoritesArray.map((item) => {
          return (
            <FavoriteMovieCard
              key={item.id}
              movieId={item.id}
              name={item.name}
              year={item.year}
              poster={item.poster}
              onRemove={removeFavorite}
            />
          );
        })}
      </div>
    </section>
  );
}
