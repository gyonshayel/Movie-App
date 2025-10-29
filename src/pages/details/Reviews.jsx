import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Error } from "../../components/Error";
import { ReviewCard } from "./ReviewCard";
import { HorizontalScroll } from "../../components/HorizontalScroll";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../components/ui/empty";

export function Reviews({ apiKey }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(true);
  const containerRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const apiCall = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;
      const response = await fetch(apiCall);

      if (!response.ok) throw new Error("Failed to fetch data from the server");

      const data = await response.json();
      setReviews(data.results);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, apiKey]);

  useEffect(() => {
    if (reviews.length === 0) {
      setHasResults(false);
    } else {
      setHasResults(true);
    }
  }, [reviews]);

  return (
    <>
      {hasResults ? (
        <HorizontalScroll scrollRef={containerRef}>
          <div
            ref={containerRef}
            className="flex overflow-x-scroll gap-2 lg:gap-3 lg:mx-2.5 py-2 lg:py-4 scrollbar-hide scroll-smooth"
          >
            {reviews.map((review) => {
              const avatar = review.author_details.avatar_path
                ? `https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`
                : null;
              return (
                <ReviewCard
                  key={review.id}
                  avatar={avatar}
                  username={review.author_details.username}
                  rating={review.author_details.rating}
                  review={review.content}
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
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </EmptyMedia>
            <EmptyDescription>Currently no reviews</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {error && <Error message={error} />}
    </>
  );
}
