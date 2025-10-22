import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { HomePage } from "./pages/home/HomePage";
import { SearchResultsPage } from "./pages/search/SearchResultsPage";
import { MovieDetailsPage } from "./pages/details/MovieDetailsPage";
import "./App.css";

function App() {
  const apiKey = "bc63ebee257313f7280d383f25f847ae";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <HeaderWithNavigation apiKey={apiKey} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage apiKey={apiKey} />} />
            <Route path="/search/:query" element={<SearchResultsPage />} />
            <Route path="/search/:id/details" element={<MovieDetailsPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

function HeaderWithNavigation({ apiKey }) {
  const navigate = useNavigate();

  const handleSearchResults = (query) => {
    if (query.trim()) navigate(`/search/${encodeURIComponent(query)}`);
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
