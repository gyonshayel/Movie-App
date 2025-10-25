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
import "./App.css";

const apiKey = "bc63ebee257313f7280d383f25f847ae";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <WatchLaterProvider>
          <div className="flex flex-col min-h-screen">
            <HeaderWithNavigation apiKey={apiKey} />
            <main className="flex-1">
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
              </Routes>
            </main>
            <Footer />
          </div>
        </WatchLaterProvider>
      </Router>
    </ThemeProvider>
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
