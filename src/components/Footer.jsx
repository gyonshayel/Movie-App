import { ModeToggle } from "./mode-toggle";

export function Footer() {
  return (
    <footer className="flex justify-between items-center gap-4 my-10 mx-4">
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
    </footer>
  );
}
