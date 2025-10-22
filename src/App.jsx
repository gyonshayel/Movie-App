import { HomePage } from "./pages/home/HomePage";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  const handleSearch = (query) => {
    console.log("Search for:", query);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header onSearch={handleSearch} />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
