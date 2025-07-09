import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../App";
import styles from "./ButtonFilters.module.css";

// Helper to extract decade from release year
const getDecade = (dateString) => {
  if (!dateString) return null;
  const year = new Date(dateString).getFullYear();
  return Math.floor(year / 10) * 10;
};

const ButtonFilters = () => {
  const { popularMovies, setFilteredMovie } = useContext(MovieContext);

  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeLanguage, setActiveLanguage] = useState("All Languages");
  const [activeDecade, setActiveDecade] = useState("All Decades");

  const clearAllFilters = () => {
    setActiveGenre("All Genres");
    setActiveLanguage("All Languages");
    setActiveDecade("All Decades");
  };

  useEffect(() => {
    if (popularMovies.length > 0) {
      const uniqueGenres = Array.from(new Set(popularMovies.map((m) => m.Genre)));
      const uniqueLanguages = Array.from(new Set(popularMovies.map((m) => m.Language)));

      setGenres(["All Genres", ...uniqueGenres]);
      setLanguages(["All Languages", ...uniqueLanguages]);
    }
  }, [popularMovies]);

  const computeGenreCounts = () => {
    const genreMap = {};
    popularMovies.forEach((movie) => {
      if ((activeLanguage === "All Languages" || movie.Language === activeLanguage) && (activeDecade === "All Decades" || getDecade(movie.ReleaseDate)?.toString() === activeDecade)) {
        genreMap[movie.Genre] = (genreMap[movie.Genre] || 0) + 1;
      }
    });
    const total = Object.values(genreMap).reduce((a, b) => a + b, 0);
    return { "All Genres": total, ...genreMap };
  };

  const computeLanguageCounts = () => {
    const langMap = {};
    popularMovies.forEach((movie) => {
      if ((activeGenre === "All Genres" || movie.Genre === activeGenre) && (activeDecade === "All Decades" || getDecade(movie.ReleaseDate)?.toString() === activeDecade)) {
        langMap[movie.Language] = (langMap[movie.Language] || 0) + 1;
      }
    });
    const total = Object.values(langMap).reduce((a, b) => a + b, 0);
    return { "All Languages": total, ...langMap };
  };

  const computeDecadeCounts = () => {
    const decadeMap = {};
    popularMovies.forEach((movie) => {
      if ((activeGenre === "All Genres" || movie.Genre === activeGenre) && (activeLanguage === "All Languages" || movie.Language === activeLanguage)) {
        const decade = getDecade(movie.ReleaseDate);
        if (decade) {
          decadeMap[decade] = (decadeMap[decade] || 0) + 1;
        }
      }
    });
    const total = Object.values(decadeMap).reduce((a, b) => a + b, 0);
    return { "All Decades": total, ...decadeMap };
  };

  const genreCounts = computeGenreCounts();
  const languageCounts = computeLanguageCounts();
  const decadeCounts = computeDecadeCounts();

  useEffect(() => {
    let filtered = [...popularMovies];

    if (activeGenre !== "All Genres") {
      filtered = filtered.filter((movie) => movie.Genre === activeGenre);
    }

    if (activeLanguage !== "All Languages") {
      filtered = filtered.filter((movie) => movie.Language === activeLanguage);
    }

    if (activeDecade !== "All Decades") {
      filtered = filtered.filter((movie) => getDecade(movie.ReleaseDate)?.toString() === activeDecade);
    }

    setFilteredMovie(filtered);
  }, [activeGenre, activeLanguage, activeDecade, popularMovies, setFilteredMovie]);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.clearBtnWrapper}>
        <button
          className={styles.clearBtn}
          onClick={clearAllFilters}
        >
          Clear All Filters
        </button>
      </div>

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
              <span>{genre}</span>
              <span>{genreCounts[genre] || 0}</span>
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
              <span>{lang}</span>
              <span>{languageCounts[lang] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.filterGroup}>
          {[
            "All Decades",
            ...Object.keys(decadeCounts)
              .filter((d) => d !== "All Decades")
              .sort((a, b) => Number(b) - Number(a)),
          ].map((decade) => (
            <div
              key={decade}
              className={`${styles.filterBtn} ${decade === activeDecade ? styles.active : ""}`}
              onClick={() => setActiveDecade(decade)}
              role='button'
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveDecade(decade)}
            >
              <span>{decade}</span>
              <span>{decadeCounts[decade] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonFilters;
