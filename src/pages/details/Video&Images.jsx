import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Error } from "../../components/Error";
import { HorizontalScroll } from "../../components/HorizontalScroll";

export function VideoAndImages({ apiKey }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
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

  return (
    <>
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
      {error && <Error />}
    </>
  );
}
