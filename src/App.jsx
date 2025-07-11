import { AnimatePresence } from "framer-motion";
import { useEffect, useState, createContext } from "react";
import ButtonFilters from "./components/ButtonFilters";
import Comics from "./components/Comics";
import Header from "./components/Header";
import "./App.css";

export const ComicContext = createContext();

function App() {
  const [popularComics, setPopularComics] = useState([]);
  const [filteredComic, setFilteredComic] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false); // ← Toggle for mobile sidebar

  useEffect(() => {
    const fetchLocalComics = async () => {
      const response = await fetch("/data/comics.json");
      const data = await response.json();
      setPopularComics(data);
      setFilteredComic(data);
    };
    fetchLocalComics();
  }, []);

  const value = {
    popularComics,
    filteredComic,
    setFilteredComic,
  };

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <ComicContext.Provider value={value}>
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
              <Comics />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ComicContext.Provider>
  );
}

export default App;
