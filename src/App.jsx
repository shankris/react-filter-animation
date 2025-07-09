import { AnimatePresence } from "framer-motion";
import { useEffect, useState, createContext } from "react";
import ButtonFilters from "./components/ButtonFilters";
import Movies from "./components/Movies";
import "./App.css"; // <-- Ensure this is where your styles live

export const MovieContext = createContext();

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);

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

  return (
    <MovieContext.Provider value={value}>
      <div className='app'>
        {/* Full-width header */}
        <header className='header'>🎬 200 Movies</header>

        {/* Main layout below the header */}
        <div className='layout'>
          <aside className='sidebar'>
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
