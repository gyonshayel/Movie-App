import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Error } from "../../components/Error";
import { ReviewCard } from "./ReviewCard";

export function Reviews({ apiKey }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

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
      <div className="flex overflow-x-scroll">
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
      {error && <Error />}
    </>
  );
}
