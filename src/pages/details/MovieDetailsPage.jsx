import { useEffect } from "react";
import { useParams } from "react-router";
import { TopLevelDetails } from "./TopLevelDetails";
import { VideoAndImages } from "./Video&Images";
import { Cast } from "./Cast";
import { Reviews } from "./Reviews";
import { MovieList } from "../../components/MovieList";
import { Separator } from "../../components/ui/separator";

export function MovieDetailsPage({ apiKey }) {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <section className="container">
      <TopLevelDetails apiKey={apiKey} />
      <Separator className="my-6" />
      <h2 className="text-2xl lg:text-3xl font-medium">Videos & Photos</h2>
      <VideoAndImages apiKey={apiKey} />
      <Separator className="my-6" />
      <h2 className="text-2xl lg:text-3xl font-medium">Cast</h2>
      <Cast apiKey={apiKey} />
      <Separator className="my-6" />
      <h2 className="text-2xl lg:text-3xl font-medium">User Reviews</h2>
      <Reviews apiKey={apiKey} />
      <Separator className="my-6" />
      <MovieList
        key={id}
        id={"similar-movies"}
        url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`}
        listName={"Similar Movies"}
      />
    </section>
  );
}
