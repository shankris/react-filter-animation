import { AnimatePresence } from "framer-motion";
import { useEffect, useState, createContext } from "react";
import ButtonFilters from "./components/ButtonFilters";
import Movies from "./components/Movies";
import Header from "./components/Header";
import "./App.css";

export const MovieContext = createContext();

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false); // ← Toggle for mobile sidebar

  useEffect(() => {
    const fetchLocalMovies = async () => {
      const response = await fetch("/data/movies.json");
      const data = await response.json();
      setPopularMovies(data);
      setFilteredMovie(data);
    };
    fetchLocalMovies();
  }, []);

  const value = {
    popularMovies,
    filteredMovie,
    setFilteredMovie,
  };

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <MovieContext.Provider value={value}>
      <div className='app'>
        <Header onToggleSidebar={handleToggleSidebar} />

        {showSidebar && (
          <div
            className='overlay'
            onClick={handleToggleSidebar}
          ></div>
        )}

        <div className={`layout ${showSidebar ? "sidebar-open" : ""}`}>
          <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
            <ButtonFilters />
          </aside>

          <main className='main-content'>
            <AnimatePresence>
              <Movies />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </MovieContext.Provider>
  );
}

export default App;
