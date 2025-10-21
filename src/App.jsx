import { MovieCard } from "./components/MovieCard";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MovieCard
        name={"The Batman"}
        year={"2022"}
        poster={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUOpwFVoR5xgrQX0AqB__TnzrmPtDbk9l30LJt78ih0wvfo-CW"
        }
      />
    </ThemeProvider>
  );
}

export default App;
