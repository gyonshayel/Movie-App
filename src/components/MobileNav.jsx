import { useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SearchBar } from "./SearchBar";

export function MobileNav({
  query,
  setQuery,
  suggestions,
  showDropdown,
  setShowDropdown,
  onSearch,
  onSelectMovie,
}) {
  const [open, setOpen] = useState(false);

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

        <div className="">
          <SearchBar
            searchBarFor={"mobile"}
            autoFocus={true}
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            onSearch={onSearch}
            onSelectMovie={onSelectMovie}
            setOpen={setOpen}
          />
        </div>

        <SheetFooter>
          <SheetTrigger asChild>
            <Link to={"/watchlist"}>
              <button>
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
              </button>
            </Link>
          </SheetTrigger>
          <SheetTrigger asChild>
            <Link to={"/favorites"}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 inline-block w-5 h-5 mb-1 mr-4"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                Favorites
              </button>
            </Link>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
