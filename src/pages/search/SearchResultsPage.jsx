import { useState } from "react";
import { useParams } from "react-router";
import { MovieList } from "../../components/MovieList";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";

export function SearchResultsPage({ apiKey }) {
  const [hasResults, setHasResults] = useState(true);
  const { query } = useParams();
  return (
    <section className="container">
      <MovieList
        key={query}
        id={"search-results"}
        url={`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`}
        listName={`Results for "${query}"`}
        onResults={(results) => setHasResults(results > 0)}
      />

      {!hasResults && (
        <Empty className="border border-dashed my-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg
                id="search-btn__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </EmptyMedia>
            <EmptyTitle>No Search Results</EmptyTitle>
            <EmptyDescription>
              No results for your search query. Try checking your spelling or a
              different key word.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
