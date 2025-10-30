import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getYear } from "../utils/getYear";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar({
  searchBarFor = null,
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
  }, [setShowDropdown]);

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
    navigate(`/movie/${movie.id}/details`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 md:gap-4 px-2 lg:p-0 m-auto max-w-3xl"
    >
      <div ref={dropdownRef} className="w-full relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="text-sm lg:text-base px-2 lg:px-4 rounded-2xl focus:bg-muted"
          id="search"
          type="text"
          placeholder="Search for movies & tv shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        />
        {/* Suggestion Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute left-0 top-full text-sm lg:text-base bg-muted border border-border rounded-md overflow-y-auto w-full">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                tabIndex={0}
                onMouseDown={() => handleSelect(movie)}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(movie)}
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
        className="rounded-full bg-transparent"
        variant="outline"
        size="icon"
        aria-label="Submit"
      >
        <svg
          id="search-btn__icon"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
    </form>
  );
}
