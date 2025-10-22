import { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MobileNav } from "./MobileNav";
import { Error } from "./Error";
import { getYear } from "../utils/getYear";

export function Header({ apiKey, onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  // const [debouncedQuery, setDebouncedQuery] = useState("");

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 500);

  //   return () => clearTimeout(handler);
  // }, [query]);

  // useEffect(() => {
  //   if (debouncedQuery.trim !== "") {
  //     onSearch(debouncedQuery);
  //   }
  // }, [debouncedQuery, onSearch]);

  // const handleSearch = (event) => {
  //   if (onSearch) {
  //     event.preventDefault();
  //     onSearch(query);
  //   }
  // };

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

  const handleSelect = (movie) => {
    setQuery(movie.title);
    setShowDropdown(false);
    if (onSelectMovie) onSelectMovie(movie);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 mb-8 bg-background border-b border-border shadow-sm">
      {/* Logo */}
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight">Movie DB</h1>
      </div>

      {/* Search bar for larger screens) */}
      <form className="hidden grow lg:flex items-center gap-2 mx-16 max-w-3xl">
        <div className="w-[100%] relative">
          <Input
            className="lg:block rounded-2xl"
            id="search-lg"
            type="text"
            placeholder="Search for movies & tv shows"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          />
          {/* Suggestion Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute left-0 top-full bg-background border border-border rounded-md z-50 overflow-y-auto w-[100%]">
              {suggestions.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => handleSelect(movie)}
                  className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {movie.title}{" "}
                  {movie.release_date && (
                    <span className="text-muted-foreground text-sm">
                      ({getYear(movie.release_date)})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          className="rounded-[50%]"
          variant="outline"
          size="icon"
          aria-label="Submit"
        >
          <svg
            id="search-btn__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </form>

      <div className="flex gap-4">
        <a className="hidden lg:block">Watch List</a>
        <a className="hidden lg:block">Favorites</a>
      </div>

      {/* Mobile navigation */}
      <MobileNav
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleSelect={handleSelect}
      />
      {error && <Error />}
    </header>
  );
}
