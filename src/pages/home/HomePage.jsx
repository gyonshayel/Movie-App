import { MovieList } from "./MovieList";

export function HomePage() {
  const apiKey = "bc63ebee257313f7280d383f25f847ae";

  return (
    <>
      <MovieList
        id={"top-picks"}
        url={"https://api.themoviedb.org/3/movie/top_rated"}
        apiKey={apiKey}
        listName={"Top Picks"}
      />

      <MovieList
        id={"popular"}
        url={"https://api.themoviedb.org/3/movie/popular"}
        apiKey={apiKey}
        listName={"Popular"}
      />

      <MovieList
        id={"now-playing"}
        url={"https://api.themoviedb.org/3/movie/now_playing"}
        apiKey={apiKey}
        listName={"Now Playing"}
      />

      <MovieList
        id={"upcoming"}
        url={"https://api.themoviedb.org/3/movie/upcoming"}
        apiKey={apiKey}
        listName={"Upcoming"}
      />
    </>
  );
}
