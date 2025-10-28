import { Button } from "./ui/button";

export function HorizontalScroll({ children, scrollRef }) {
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.9;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Left scroll button */}
      <Button
        onClick={() => scroll("left")}
        variant="ghost"
        size="icon"
        className="hidden lg:block absolute -left-2 top-[50%] z-10 cursor-pointer rounded-full bg-background/90 opacity-20 hover:opacity-90 transition-opacity duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Button>

      {/* Scroll container */}
      {children}

      {/* Right scroll button */}
      <Button
        onClick={() => scroll("right")}
        variant="ghost"
        size="icon"
        className="hidden lg:block absolute -right-2 top-[50%] z-10 cursor-pointer rounded-full bg-background/90 opacity-20 hover:opacity-90 transition-opacity duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Button>
    </>
  );
}
