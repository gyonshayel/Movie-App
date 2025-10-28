import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function FavoriteMovieCard({ movieId, name, year, poster, onRemove }) {
  const handleClick = () => {
    onRemove(movieId);
  };

  return (
    <Card className="group relative gap-0.5 p-1 lg:p-2 min-w-[125px] lg:min-w-[150px] max-w-[150px]">
      <CardContent className="p-0.5">
        <Link to={`/search/${movieId}/details`}>
          <img
            src={poster || "https://placehold.co/200x300"}
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
      <div className="absolute bottom-1 right-1 opacity-100">
        <Button
          onClick={handleClick}
          variant="outline"
          size="icon"
          className="rounded-full transition-transform duration-200"
          aria-label="Remove from favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </Card>
  );
}
