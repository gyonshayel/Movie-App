import { Link } from "react-router";
import { useState, useEffect } from "react";
import { FavoriteMovieCard } from "./FavoriteMovieCard";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";
import { HeartIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

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
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HeartIcon className="[svg]:fill-red-500 [svg]:stroke-red-500" />
          </EmptyMedia>
          <EmptyTitle>Favorites Empty</EmptyTitle>
          <EmptyDescription>Start adding movies you love!</EmptyDescription>
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
      <h2 className="text-2xl lg:text-3xl font-medium">Favorites</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(125px,150px))] justify-center lg:justify-start gap-2 lg:gap-3 py-2 lg:py-4">
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
