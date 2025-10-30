import { useEffect, useState, useRef } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Error } from "./Error";
import { MovieCard } from "./MovieCard";
import { getYear } from "../utils/getYear";
import { HorizontalScroll } from "./HorizontalScroll";
import { MovieCardSkeletonList } from "./MovieCardSkeletonList";

export function MovieList({ id, url, listName, onResults = null }) {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const containerRef = useRef(null);
  const [hasResults, setHasResults] = useState(true);

  const fetchMovieListData = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);

      // Wait before calling the API (simulate delay)
      await new Promise((resolve) => setTimeout(resolve, 200));

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

      if (data.total_results === 0) setHasResults(false);
      if (pageNumber >= data.total_pages) setHasMore(false);
      if (onResults) onResults(data.total_results || 0);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
      error && setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    setHasResults(true);
    fetchMovieListData(page);
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading || error) return;

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
  }, [hasMore, loading, id, error]);

  return (
    <>
      {initialLoading ? (
        <MovieCardSkeletonList />
      ) : (
        <div>
          <h2 className="text-2xl lg:text-3xl font-medium">{listName}</h2>
          {hasResults && (
            <HorizontalScroll scrollRef={containerRef}>
              <div
                ref={containerRef}
                id={id}
                className="flex overflow-x-scroll gap-2 lg:gap-3 lg:mx-2.5 py-2 lg:py-4 scrollbar-hide scroll-smooth"
              >
                {movieList.map((item) => {
                  return (
                    <MovieCard
                      key={item.id}
                      movieId={item.id}
                      name={item.title}
                      year={getYear(item.release_date)}
                      poster={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                          : "https://placehold.co/200x300?text=Poster+N/A"
                      }
                    />
                  );
                })}

                {/* When using loading state, in order to see the spinner user need to
          scroll again to the end */}
                {hasMore && (
                  <div className="self-center min-w-20 min-h-14 p-2">
                    <LoadingSpinner />
                    {!loading && (
                      <div ref={observerRef} className="w-1 h-1"></div>
                    )}
                  </div>
                )}
              </div>
            </HorizontalScroll>
          )}
        </div>
      )}
      {error && <Error message={error} />}
    </>
  );
}
