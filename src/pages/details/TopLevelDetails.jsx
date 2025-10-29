import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Genres } from "./Genres";
import { Error } from "../../components/Error";
import { getYear } from "../../utils/getYear";
import { AddToWatchList } from "../../components/AddToWatchList";
import { AddToFavorites } from "../../components/AddToFavorites";
import { Badge } from "../../components/ui/badge";
import { StarIcon } from "lucide-react";
import { ToggleGroup } from "../../components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export function TopLevelDetails({ apiKey }) {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [error, setError] = useState(null);

  const fetchMovieData = async () => {
    try {
      const apiCall = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
      const response = await fetch(apiCall);

      if (!response.ok) throw new Error("Failed to fetch data from the server");

      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [id, apiKey]);

  const {
    id: movieId,
    poster_path,
    title,
    release_date,
    overview,
    genres = [],
    vote_average,
  } = movieData;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/original/${poster_path}`
    : "https://placehold.co/200x300";

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-4 lg:gap-6">
        <div>
          <img
            className="min-w-[125px] lg:min-w-[150px] max-w-[150px] h-auto rounded-md object-cover aspect-[2/3]"
            src={poster}
            alt={`Poster of ${title}`}
          />
        </div>
        <div className="flex flex-col gap-2 lg:gap-2">
          <h1 className="text-2xl lg:text-3xl line-clamp-3 font-bold">
            {title} -{" "}
            <span className="text-base lg:text-lg text-muted-foreground">
              {release_date && getYear(release_date)}
            </span>
          </h1>
          <div className="flex-1">
            <Genres genres={genres} />
          </div>
          <Badge variant="outline" className="text-lg py-[3px]">
            <StarIcon className="[svg]:fill-yellow-500 [svg]:stroke-yellow-500" />{" "}
            {vote_average?.toFixed(1)}/10
          </Badge>
          <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
            <AddToWatchList
              movieId={movieId}
              name={title}
              year={getYear(release_date)}
              poster={poster}
            />
            <AddToFavorites
              movieId={movieId}
              name={title}
              year={getYear(release_date)}
              poster={poster}
            />
          </ToggleGroup>
        </div>
        <Accordion
          type="single"
          collapsible
          className="col-span-2 border-2 border-border rounded-4xl px-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-4 text-2xl lg:text-3xl font-medium">
              Overview
            </AccordionTrigger>
            <AccordionContent className="text-base text-balance">
              {overview}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {error && <Error message={error} />}
    </>
  );
}
