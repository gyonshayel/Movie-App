import { useParams } from "react-router";
import { MovieList } from "../home/MovieList";

export function SearchResultsPage({ apiKey }) {
  const { query } = useParams();
  return (
    <MovieList
      id={"search-results"}
      url={`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`}
      listName={"Search Results"}
    />
  );
}
