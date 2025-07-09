import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../App";
import styles from "./ButtonFilters.module.css";

const ButtonFilters = () => {
  const { popularMovies, setFilteredMovie } = useContext(MovieContext);

  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [activeGenre, setActiveGenre] = useState("All");
  const [activeLanguage, setActiveLanguage] = useState("All");

  // Compute filter counts dynamically
  const computeGenreCounts = () => {
    const genreMap = {};

    popularMovies.forEach((movie) => {
      if (activeLanguage === "All" || movie.Language === activeLanguage) {
        genreMap[movie.Genre] = (genreMap[movie.Genre] || 0) + 1;
      }
    });

    return { All: popularMovies.filter((m) => activeLanguage === "All" || m.Language === activeLanguage).length, ...genreMap };
  };

  const computeLanguageCounts = () => {
    const langMap = {};

    popularMovies.forEach((movie) => {
      if (activeGenre === "All" || movie.Genre === activeGenre) {
        langMap[movie.Language] = (langMap[movie.Language] || 0) + 1;
      }
    });

    return { All: popularMovies.filter((m) => activeGenre === "All" || m.Genre === activeGenre).length, ...langMap };
  };

  const genreCounts = computeGenreCounts();
  const languageCounts = computeLanguageCounts();

  useEffect(() => {
    if (popularMovies.length > 0) {
      const uniqueGenres = Array.from(new Set(popularMovies.map((m) => m.Genre)));
      const uniqueLanguages = Array.from(new Set(popularMovies.map((m) => m.Language)));

      setGenres(["All", ...uniqueGenres]);
      setLanguages(["All", ...uniqueLanguages]);
    }
  }, [popularMovies]);

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
        <h3>Genres</h3>
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
              {genre} ({genreCounts[genre] || 0})
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <h3>Languages</h3>
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
              {lang} ({languageCounts[lang] || 0})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonFilters;
