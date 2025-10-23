import { useEffect, useRef } from "react";
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
  onSearch,
  onSelectMovie,
  setOpen,
}) {
  const btnOnClick = (event) =>
    searchBarFor === null ? handleSearch(event) : handleSearchClick(event);
  const dropdownRef = useRef(null);

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

  // For the search button
  const handleSearchClick = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    if (setOpen) setOpen(false);
    handleSearch(event);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setShowDropdown(false);
    if (onSearch) onSearch(query);
  };

  // For the search dropdown items
  const handleSelect = (movie) => {
    setShowDropdown(false);
    console.log("handling");
    if (searchBarFor !== null) setOpen(false);
    setQuery("");
    if (onSelectMovie) onSelectMovie(movie.id);
  };

  return (
    <form className="flex gap-4 p-4 pt-0 lg:gap-2 lg:p-0 lg:m-auto lg:max-w-3xl">
      <div ref={dropdownRef} className="w-[100%] relative">
        <Input
          className="rounded-2xl"
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
          <ul className="absolute left-0 top-full bg-background border border-border rounded-md  overflow-y-auto w-[100%]">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                onMouseDown={() => handleSelect(movie)}
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
        onClick={btnOnClick}
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
  );
}
