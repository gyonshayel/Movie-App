import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getYear } from "../utils/getYear";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar({
  searchBarFor = null,
  autoFocus = false,
  query,
  setQuery,
  suggestions,
  showDropdown,
  setShowDropdown,
  setOpen,
}) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Closing suggestion when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      if (searchBarFor !== null) setOpen(false);
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleSelect = (movie) => {
    setQuery("");
    if (searchBarFor !== null) setOpen(false);
    navigate(`/search/${encodeURIComponent(movie.id)}/details`);
  };

  return (
    <form className="flex gap-2 md:gap-4 px-2 lg:p-0 m-auto max-w-3xl">
      <div ref={dropdownRef} className="w-full relative">
        <Input
          className="text-sm lg:text-base px-2 lg:px-4 rounded-2xl"
          autoFocus={autoFocus}
          id="search"
          type="text"
          placeholder="Search for movies & tv shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        />
        {/* Suggestion Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute left-0 top-full z-40 text-sm lg:text-base bg-background/90 backdrop-blur-2xl border border-border rounded-md overflow-y-auto w-full">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                onMouseDown={() => handleSelect(movie)}
                className="px-2 lg:px-4 py-2 lg:py-4 cursor-pointer"
              >
                {movie.title}{" "}
                {movie.release_date && (
                  <span className="text-muted-foreground text-xs lg:text-sm">
                    ({getYear(movie.release_date)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="rounded-full"
        variant="outline"
        size="icon"
        aria-label="Submit"
        onClick={handleSearch}
      >
        <svg
          id="search-btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </form>
  );
}
