import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AddToWatchList } from "./AddToWatchList";

export function MovieCard({ movieId, name, year, poster }) {
  const pathname = window.location.pathname;

  return (
    <Card className="group relative gap-0.5 p-1 lg:p-2 min-w-[125px] lg:min-w-[150px] max-w-[150px]">
      <CardContent className="p-0.5">
        <Link to={`/search/${movieId}/details`}>
          <img
            src={poster || "https://placehold.co/200x300?text=Poster+N/A"}
            alt={`Poster of ${name}`}
            loading="lazy"
            className="w-full h-auto rounded-md object-cover aspect-[2/3]"
          />
        </Link>
      </CardContent>
      <CardHeader className="grid-rows-[1fr_auto] gap-0 lg:gap-1 p-0">
        <CardTitle className="text-sm lg:text-base line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm">
          <p>{year}</p>
        </CardDescription>
      </CardHeader>

      {/* Making bin icon visible at all times */}
      <div
        className={
          pathname === "/watchlist"
            ? "absolute bottom-1 right-1 opacity-100"
            : "hidden lg:block absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        }
      >
        <AddToWatchList
          movieId={movieId}
          name={name}
          year={year}
          poster={poster}
        />
      </div>
    </Card>
  );
}
