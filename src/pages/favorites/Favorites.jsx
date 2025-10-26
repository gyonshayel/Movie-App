import { useState, useEffect } from "react";
import { FavoriteMovieCard } from "./FavoriteMovieCard";

export function Favorites() {
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
    <div className="flex overflow-x-scroll gap-1.5 mt-2 mb-4 py-4">
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
  );
}
