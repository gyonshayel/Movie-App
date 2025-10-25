import { useEffect, useState, useRef } from "react";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { MovieCard } from "./MovieCard";
import { getYear } from "../utils/getYear";

export function MovieList({ id, url, listName }) {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  const fetchMovieListData = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);

      // Wait before calling the API (simulate delay)
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieListData(page);
  }, [page, url]);

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

  return (
    <>
      <h2 className="text-2xl font-bold">{listName}</h2>
      <div
        ref={containerRef}
        id={id}
        className="flex overflow-x-scroll gap-1.5 mt-2 mb-4 py-4"
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

        <div
          className={
            loading === false ? "hidden" : "self-center min-w-14 min-h-14 p-2"
          }
        >
          <Loading />
        </div>

        {error && <Error />}

        {hasMore && !loading && (
          <div ref={observerRef} className="w-1 h-1"></div>
        )}
      </div>
    </>
  );
}
