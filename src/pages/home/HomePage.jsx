import { MovieList } from "../../components/MovieList";

export function HomePage({ apiKey }) {
  return (
    <section>
      <MovieList
        id={"top-picks"}
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`}
        listName={"Top Picks"}
      />

      <MovieList
        id={"popular"}
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`}
        listName={"Popular"}
      />

      <MovieList
        id={"now-playing"}
        url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`}
        listName={"Now Playing"}
      />

      <MovieList
        id={"upcoming"}
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`}
        listName={"Upcoming"}
      />
    </section>
  );
}
