import { MovieList } from "../../components/MovieList";
import { Separator } from "../../components/ui/separator";

const categories = [
  { id: "top-picks", path: "top_rated", name: "Top Picks" },
  { id: "popular", path: "popular", name: "Popular" },
  { id: "now-playing", path: "now_playing", name: "Now Playing" },
  { id: "upcoming", path: "upcoming", name: "Upcoming" },
];

export function HomePage({ apiKey }) {
  const baseUrl = "https://api.themoviedb.org/3/movie";

  return (
    <section>
      {categories.map(({ id, path, name }) => (
        <div key={id}>
          <MovieList
            id={id}
            url={`${baseUrl}/${path}?api_key=${apiKey}`}
            listName={name}
          />
          <Separator className="my-6 bg-background" />
        </div>
      ))}
    </section>
  );
}
