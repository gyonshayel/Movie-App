import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { WatchLater } from "./WatchLater";

export function MovieCard({ movieId, name, year, poster }) {
  return (
    <Card className="min-w-[125px] max-w-[150px] lg:min-w-[150px] p-1 hover:scale-[1.03] transition-transform">
      <CardContent className="p-1">
        <Link to={`/search/${movieId}/details`}>
          <img
            src={poster || "https://placehold.co/200x300"}
            alt={`Poster of ${name}`}
            loading="lazy"
            className="w-full h-auto rounded-md object-cover aspect-[2/3]"
          />
        </Link>
      </CardContent>
      <CardHeader className="p-1 pt-0">
        <CardTitle className="text-sm sm:text-base line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          <p>{year}</p>
        </CardDescription>
        <CardAction>
          <WatchLater
            movieId={movieId}
            name={name}
            year={year}
            poster={poster}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
