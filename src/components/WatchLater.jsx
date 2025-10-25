import { useState, useEffect } from "react";

export function WatchLater({ movieId, name, year, poster }) {
  const [isClicked, setIsClicked] = useState(false);

  // Checking whether movieId is already in watch list
  useEffect(() => {
    const arr = localStorage.getItem("watchLaterArray");
    const watchLaterArray = arr ? JSON.parse(arr) : [];

    if (watchLaterArray.some((object) => object.id === movieId)) {
      setIsClicked(true);
    }
  }, [movieId]);

  // Update local storage when toggling watch-later-btn
  useEffect(() => {
    const arr = localStorage.getItem("watchLaterArray");
    const watchLaterArray = arr ? JSON.parse(arr) : [];

    if (isClicked) {
      if (!watchLaterArray.some((object) => object.id === movieId)) {
        watchLaterArray.unshift({
          id: movieId,
          name: name,
          year: year,
          poster: poster,
        });
      }
    } else {
      const index = watchLaterArray.findIndex(
        (object) => object.id === movieId
      );
      if (index > -1) {
        watchLaterArray.splice(index, 1);
      }
    }

    localStorage.setItem("watchLaterArray", JSON.stringify(watchLaterArray));
  }, [isClicked, movieId, name, year, poster]);

  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      className="watch-later-btn cursor-pointer transition-transform duration-200 hover:scale-110"
      aria-label="Add/remove from watch list"
    >
      {isClicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      )}
    </button>
  );
}
