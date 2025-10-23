import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { getYear } from "../utils/getYear";

export function MobileNav({
  query,
  setQuery,
  suggestions,
  showDropdown,
  setShowDropdown,
  handleSelect,
  handleSearch,
  dropdownRef,
}) {
  const [open, setOpen] = useState(false);

  // For the search button
  const handleSearchClick = (event) => {
    if (!query.trim()) return;
    handleSearch(event);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} className="lg:hidden">
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="pb-0">
          <SheetTitle>Search</SheetTitle>
          <SheetDescription className="sr-only">
            Search for movies & tv shows.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-nowrap gap-4 p-4 pt-0">
          <label htmlFor="search-sm" className="hidden">
            Search
          </label>
          <div ref={dropdownRef} className="w-[100%] relative">
            <Input
              className="rounded-2xl"
              autoFocus
              id="search-sm"
              type="text"
              placeholder="Search for movies & tv shows."
              required
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
                    onClick={() => {
                      handleSelect(movie);
                      setOpen(false);
                    }}
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
            onClick={handleSearchClick}
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
        <SheetFooter>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 inline-block w-5 h-5 mb-1 mr-4"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
            Watch List
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 inline-block w-5 h-5 mb-1 mr-4"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            Favorites
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
