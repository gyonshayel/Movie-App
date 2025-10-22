import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MobileNav } from "./MobileNav";

export function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim !== "") {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSearch = (event) => {
    if (onSearch) {
      event.preventDefault();
      onSearch(query);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 mb-8 bg-background border-b border-border shadow-sm">
      {/* Logo */}
      <div className="">
        <h1 className="text-3xl font-semibold tracking-tight">Movie DB</h1>
      </div>

      {/* Search bar for larger screens) */}
      <form className="hidden grow lg:flex items-center gap-2 mx-16 max-w-3xl">
        <Input
          className="lg:block rounded-2xl"
          id="search-lg"
          type="text"
          placeholder="Search for movies & tv shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="rounded-[50%]"
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
        searchTxt={query}
        setSearchTxt={setQuery}
        handleSearch={handleSearch}
      />
    </header>
  );
}
