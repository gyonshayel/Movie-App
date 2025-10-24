import { useEffect } from "react";
import { useParams } from "react-router";
import { TopLevelDetails } from "./TopLevelDetails";
import { VideoAndImages } from "./Video&Images";
import { Cast } from "./Cast";
import { Reviews } from "./Reviews";
import { MovieList } from "../../components/MovieList";

export function MovieDetailsPage({ apiKey }) {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <TopLevelDetails apiKey={apiKey} />
      <VideoAndImages apiKey={apiKey} />
      <Cast apiKey={apiKey} />
      <Reviews apiKey={apiKey} />
      <MovieList
        key={id}
        id={"similar-movies"}
        url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`}
        listName={"Similar Movies"}
      />
    </>
  );
}
