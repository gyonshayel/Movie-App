import { useParams } from "react-router";
import { MovieList } from "../../components/MovieList";

export function SearchResultsPage({ apiKey }) {
  const { query } = useParams();
  return (
    <MovieList
      key={query}
      id={"search-results"}
      url={`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`}
      listName={`Results for "${query}"`}
    />
  );
}
