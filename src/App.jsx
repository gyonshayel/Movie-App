import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { SearchResultsPage } from "./pages/search/SearchResultsPage";
import { MovieDetailsPage } from "./pages/details/MovieDetailsPage";
import { WatchLaterProvider } from "./context/WatchLaterContext";
import { WatchListPage } from "./pages/watchlist/WatchListPage";
import { FavoritesPage } from "./pages/favorites/FavoritesPage";
import "./App.css";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

function App() {
  return (
    <WatchLaterProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="flex flex-col min-h-screen">
            <HeaderWithNavigation apiKey={apiKey} />
            <main className="flex-1 px-2 sm:px-3 md:px-4">
              <Routes>
                <Route path="/" element={<HomePage apiKey={apiKey} />} />
                <Route
                  path="/search/:query"
                  element={<SearchResultsPage apiKey={apiKey} />}
                />
                <Route
                  path="/search/:id/details"
                  element={<MovieDetailsPage apiKey={apiKey} />}
                />
                <Route path="/watchlist" element={<WatchListPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </WatchLaterProvider>
  );
}

function HeaderWithNavigation({ apiKey }) {
  const navigate = useNavigate();

  const handleSearchResults = (query) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleSelectMovie = (id) => {
    navigate(`/search/${encodeURIComponent(id)}/details`);
  };

  return (
    <Header
      apiKey={apiKey}
      onSearch={handleSearchResults}
      onSelectMovie={handleSelectMovie}
    />
  );
}

export default App;
