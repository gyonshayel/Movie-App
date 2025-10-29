import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
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

export function VideoAndImages({ apiKey }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(true);
  const containerRef = useRef(null);

  const fetchVideo = async () => {
    try {
      const apiCallForVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
      const responseForVideo = await fetch(apiCallForVideo);

      if (!responseForVideo.ok)
        throw new Error("Failed to fetch data from the server");

      const videoData = await responseForVideo.json();

      // Getting the Youtube trailer
      const trailer = videoData.results.find(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube" &&
          video.official === true
      );

      setVideo(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  const fetchImages = async () => {
    try {
      const apiCallForImages = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
      const responseForImages = await fetch(apiCallForImages);

      if (!responseForImages.ok)
        throw new Error("Failed to fetch data from the server");

      const imageData = await responseForImages.json();

      const imageUrls = [];
      imageData.backdrops.forEach((backdrop) => {
        imageUrls.push(
          `https://image.tmdb.org/t/p/original${backdrop.file_path}`
        );
      });

      setImages(imageUrls);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchImages();
  }, [id, apiKey]);

  useEffect(() => {
    if (video === null && images.length === 0) {
      setHasResults(false);
    } else {
      setHasResults(true);
    }
  }, [video, images]);

  return (
    <>
      {hasResults ? (
        <HorizontalScroll scrollRef={containerRef}>
          <div
            ref={containerRef}
            className="flex overflow-x-scroll gap-2 lg:gap-3 lg:mx-2.5 py-2 lg:py-4 scrollbar-hide scroll-smooth"
          >
            {/* Trailer */}
            {video && (
              <div className="w-full max-w-4xl mx-auto">
                <iframe
                  className="h-48 aspect-video rounded-lg"
                  src={video}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Images  */}

            {images.map((image, index) => {
              return (
                <img
                  className="h-48 rounded-lg object-cover"
                  key={index}
                  src={image}
                  alt={`Backdrop of the movie: ${id}`}
                  loading="lazy"
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </EmptyMedia>
            <EmptyDescription>No Video & Image data available</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {error && <Error message={error} />}
    </>
  );
}
