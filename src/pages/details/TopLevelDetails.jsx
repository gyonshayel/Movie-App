import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Genres } from "./Genres";
import { Error } from "../../components/Error";
import { getYear } from "../../utils/getYear";
import { AddToWatchList } from "../../components/AddToWatchList";
import { AddToFavorites } from "../../components/AddToFavorites";

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
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="">
          <img
            className="min-w-[125px] max-w-[150px] lg:min-w-[150px]"
            src={poster}
            alt={`Poster of ${title}`}
          />
        </div>
        <div className="">
          <h1>{title}</h1>
          <p>{release_date && getYear(release_date)}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Genres genres={genres} />
          </div>
          <p>Rating {vote_average?.toFixed(1)}</p>
          <div>
            <div>
              <AddToWatchList
                movieId={movieId}
                name={title}
                year={getYear(release_date)}
                poster={poster}
              />
              Watch Later
            </div>
            <div>
              <AddToFavorites
                movieId={movieId}
                name={title}
                year={getYear(release_date)}
                poster={poster}
              />
              Favorite
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <p className="leading-relaxed">{overview}</p>
        </div>
      </div>
      {error && <Error />}
    </>
  );
}
