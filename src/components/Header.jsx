import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { SearchBar } from "./SearchBar";
import { MobileNav } from "./MobileNav";
import { Error } from "./Error";

export function Header({ apiKey, onSearch, onSelectMovie }) {
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
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 mb-8 bg-background border-b border-border shadow-sm">
      {/* Logo */}
      <div className="">
        <Link to="/">
          <h1 className="text-3xl font-semibold tracking-tight">Movie DB</h1>
        </Link>
      </div>

      <div className="hidden lg:block grow lg:mx-16">
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          onSearch={onSearch}
          onSelectMovie={onSelectMovie}
          setOpen={null}
        />
      </div>

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
        onSearch={onSearch}
        onSelectMovie={onSelectMovie}
      />
      {error && <Error />}
    </header>
  );
}
