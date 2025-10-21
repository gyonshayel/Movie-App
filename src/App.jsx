import { HomePage } from "./pages/home/HomePage";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
