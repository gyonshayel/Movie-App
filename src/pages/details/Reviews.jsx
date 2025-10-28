import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Error } from "../../components/Error";
import { ReviewCard } from "./ReviewCard";
import { HorizontalScroll } from "../../components/HorizontalScroll";

export function Reviews({ apiKey }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
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

  return (
    <>
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
      {error && <Error />}
    </>
  );
}
