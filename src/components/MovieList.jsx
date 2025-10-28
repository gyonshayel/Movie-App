import { useEffect, useState, useRef } from "react";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { MovieCard } from "./MovieCard";
import { getYear } from "../utils/getYear";
import { HorizontalScroll } from "./HorizontalScroll";
import { Button } from "../components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty";

export function MovieList({ id, url, listName }) {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasResults, setHasResults] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  const fetchMovieListData = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);

      // Wait before calling the API (simulate delay)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Record current scroll position
      const scrollLeftBefore = containerRef.current?.scrollLeft || 0;

      const apiCall = `${url}&page=${pageNumber}`;
      const response = await fetch(apiCall);

      if (!response.ok) throw new Error("Failed to fetch data from the server");

      const data = await response.json();
      setMovieList((prev) => [...prev, ...data.results]);

      // Restore previous scroll position
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = scrollLeftBefore;
        }
      });

      if (pageNumber >= data.total_pages) {
        setHasMore(false);
      }

      if (data.total_results === 0) {
        setHasResults(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieListData(page);
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const container = document.getElementById(id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: container, threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, id]);

  return !hasResults ? (
    <Empty className="border border-dashed">
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
  ) : (
    <div className="pb-8">
      <h2 className="text-2xl lg:text-3xl font-medium">{listName}</h2>

      <HorizontalScroll scrollRef={containerRef}>
        <div
          ref={containerRef}
          id={id}
          className="flex overflow-x-scroll gap-2 lg:gap-3 lg:mx-2.5 py-2 lg:py-4 scrollbar-hide scroll-smooth"
        >
          {movieList.map((item, index) => {
            return (
              <MovieCard
                key={index}
                movieId={item.id}
                name={item.title}
                year={getYear(item.release_date)}
                poster={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              />
            );
          })}

          {/* When using loading state, in order to see the spinner user need to
          scroll again to the end */}
          {hasMore && (
            <div className="self-center min-w-20 min-h-14 p-2">
              <Loading />
              {!loading && <div ref={observerRef} className="w-1 h-1"></div>}
            </div>
          )}
        </div>
      </HorizontalScroll>

      {error && <Error />}
    </div>
  );
}
