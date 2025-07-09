import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import ButtonFilters from "./components/ButtonFilters";
import Movies from "./components/Movies";

// Create context
export const MovieContext = createContext();

// Local movie data (assumes movies.json is inside /src/data)
import localMovies from "./data/movies.json"; // keep JSON format unchanged

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);

  // Replaces the API fetch with local JSON load
  useEffect(() => {
    setPopularMovies(localMovies);
    setFilteredMovie(localMovies);
  }, []);

  const value = {
    popularMovies,
    filteredMovie,
    setFilteredMovie,
  };

  return (
    <MovieContext.Provider value={value}>
      <div className='app'>
        <ButtonFilters />
        <div className='image-container'>
          <AnimatePresence>
            <Movies />
          </AnimatePresence>
        </div>
      </div>
    </MovieContext.Provider>
  );
}

export default App;
