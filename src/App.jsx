import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { HomePage } from "./pages/home/HomePage";
import { SearchResultsPage } from "./pages/search/SearchResultsPage";
import "./App.css";

function App() {
  const apiKey = "bc63ebee257313f7280d383f25f847ae";
  const handleSearchResults = (query) => {
    console.log("Searching for:", query);
  };

  const handleSelectMovie = (query) => {
    console.log("Selected movie:", query);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header
        apiKey={apiKey}
        onSearch={handleSearchResults}
        onSelectMovie={handleSelectMovie}
      />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
