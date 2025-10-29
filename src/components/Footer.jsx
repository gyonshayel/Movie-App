import { ModeToggle } from "./mode-toggle";

export function Footer() {
  return (
    <footer className="bg-accent border-t mt-2 sm:mt-3 md:mt-4 xl:mt-5">
      <div
        className="flex justify-between items-center px-2 sm:px-3 md:px-4 xl:px-5
      py-3 md:py-4 xl:py-5"
      >
        <span>
          Powered By
          <a href="https://www.themoviedb.org/" target="_blank">
            <img
              className="h-4"
              src="/tmdb.svg"
              alt="The Movie Database(TMDB) logo"
            />
          </a>
        </span>
        <ModeToggle />
      </div>
    </footer>
  );
}
