import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { CastCard } from "./CastCard";
import { Error } from "../../components/Error";
import { HorizontalScroll } from "../../components/HorizontalScroll";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";

export function Cast({ apiKey }) {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(true);
  const containerRef = useRef(null);

  const fetchCastData = async () => {
    try {
      const apiCall = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
      const response = await fetch(apiCall);

      if (!response.ok) throw new Error("Failed to fetch data from the server");

      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  useEffect(() => {
    fetchCastData();
    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [id, apiKey]);

  useEffect(() => {
    if (cast.length === 0) {
      setHasResults(false);
    } else {
      setHasResults(true);
    }
  }, [cast]);

  return (
    <>
      {hasResults ? (
        <HorizontalScroll scrollRef={containerRef}>
          <div
            ref={containerRef}
            className="flex overflow-x-scroll gap-2 lg:gap-3 lg:mx-2.5 py-2 lg:py-4 scrollbar-hide scroll-smooth"
          >
            {cast.map((castMember) => {
              const profile = castMember.profile_path
                ? `https://image.tmdb.org/t/p/original${castMember.profile_path}`
                : null;
              return (
                <CastCard
                  key={castMember.id}
                  profile={profile}
                  name={castMember.name}
                  character={castMember.character}
                />
              );
            })}
          </div>
        </HorizontalScroll>
      ) : (
        <Empty className="border border-dashed m-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </EmptyMedia>
            <EmptyDescription>No Cast data available</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {error && <Error message={error} />}
    </>
  );
}
