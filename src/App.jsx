import { HomePage } from "./pages/home/HomePage";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  const apiKey = "bc63ebee257313f7280d383f25f847ae";
  const handleSearch = (query) => {
    console.log("Search for:", query);
  };

  const handleSelectMovie = (query) => {
    console.log("Search for:", query);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header
        apiKey={apiKey}
        onSearch={handleSearch}
        onSelectMovie={handleSelectMovie}
      />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
