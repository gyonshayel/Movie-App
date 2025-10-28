import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";
import { Error } from "./Error";
import { Button } from "./ui/button";

export function Header({ apiKey }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  // Debounced search with the dropdown
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setError(null);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok)
          throw new Error("Failed to fetch data from the server");

        const data = await response.json();
        setSuggestions(data.results.slice(0, 5)); // show top 5 suggestions
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setShowDropdown(true);
      }
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [query, apiKey]);

  return (
    <header
      className="flex justify-between items-center sticky top-0 z-50 
      px-2 sm:px-3 md:px-4 xl:px-5
      py-3 md:py-4 xl:py-5 
      mb-2 sm:mb-3 md:mb-4 xl:mb-5
      bg-background/50 backdrop-blur-3xl border-b border-accent"
    >
      {/* Logo */}
      <a
        className="text-3xl leading-[1.875rem] lg:text-4xl font-semibold tracking-tight"
        href="/"
      >
        Movie{" "}
        <div className="inline-block text-background font-bold bg-accent-foreground rounded-sm pt-0.5 pb-1 px-1">
          DB
        </div>
      </a>

      <div className="hidden grow lg:block lg:mx-16">
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          setOpen={null}
        />
      </div>

      <div className="hidden lg:flex lg:gap-1 xl:gap-2 2xl:gap-3">
        <Link to={"/watchlist"}>
          <Button variant="link">Watch List</Button>
        </Link>
        <Link to={"/favorites"}>
          <Button variant="link">Favorites</Button>
        </Link>
      </div>

      {/* Mobile navigation */}
      <MobileNav
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      {error && <Error />}
    </header>
  );
}
