import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../App";
import styles from "./ButtonFilters.module.css";

const ButtonFilters = () => {
  const { popularMovies, setFilteredMovie } = useContext(MovieContext);

  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [activeGenre, setActiveGenre] = useState("All");
  const [activeLanguage, setActiveLanguage] = useState("All");

  // Extract unique genres and languages
  useEffect(() => {
    if (popularMovies.length > 0) {
      const uniqueGenres = Array.from(new Set(popularMovies.map((m) => m.Genre)));
      const uniqueLanguages = Array.from(new Set(popularMovies.map((m) => m.Language)));

      setGenres(["All", ...uniqueGenres]);
      setLanguages(["All", ...uniqueLanguages]);
    }
  }, [popularMovies]);

  // Filter logic
  useEffect(() => {
    let filtered = [...popularMovies];

    if (activeGenre !== "All") {
      filtered = filtered.filter((movie) => movie.Genre === activeGenre);
    }

    if (activeLanguage !== "All") {
      filtered = filtered.filter((movie) => movie.Language === activeLanguage);
    }

    setFilteredMovie(filtered);
  }, [activeGenre, activeLanguage, popularMovies, setFilteredMovie]);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.group}>
        <div className={styles.filterGroup}>
          {genres.map((genre) => (
            <div
              key={genre}
              className={`${styles.filterBtn} ${genre === activeGenre ? styles.active : ""}`}
              onClick={() => setActiveGenre(genre)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveGenre(genre)}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.filterGroup}>
          {languages.map((lang) => (
            <div
              key={lang}
              className={`${styles.filterBtn} ${lang === activeLanguage ? styles.active : ""}`}
              onClick={() => setActiveLanguage(lang)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveLanguage(lang)}
            >
              {lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonFilters;
