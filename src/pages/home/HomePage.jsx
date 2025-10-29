import { MovieList } from "../../components/MovieList";
import { Separator } from "../../components/ui/separator";

export function HomePage({ apiKey }) {
  return (
    <section>
      <MovieList
        id={"top-picks"}
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`}
        listName={"Top Picks"}
      />
      <Separator className="my-6 bg-background" />
      <MovieList
        id={"popular"}
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`}
        listName={"Popular"}
      />
      <Separator className="my-6 bg-background" />
      <MovieList
        id={"now-playing"}
        url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`}
        listName={"Now Playing"}
      />
      <Separator className="my-6 bg-background" />
      <MovieList
        id={"upcoming"}
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`}
        listName={"Upcoming"}
      />
      <Separator className="my-6 bg-background" />
    </section>
  );
}
