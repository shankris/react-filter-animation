import { useContext, useEffect, useState } from "react";
import { ComicContext } from "../App";
import styles from "./ButtonFilters.module.css";

// Helper to extract decade from year
const getDecade = (year) => {
  if (!year) return null;
  return Math.floor(year / 10) * 10;
};

const ButtonFilters = () => {
  const { popularComics, setFilteredComic } = useContext(ComicContext);

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

  // Extract unique genres and languages from the data
  useEffect(() => {
    if (popularComics.length > 0) {
      const uniqueGenres = Array.from(new Set(popularComics.map((m) => m.series)));
      const uniqueLanguages = Array.from(new Set(popularComics.map((m) => m.language)));

      setGenres(["All Genres", ...uniqueGenres]);
      setLanguages(["All Languages", ...uniqueLanguages]);
    }
  }, [popularComics]);

  const computeGenreCounts = () => {
    const genreMap = {};
    popularComics.forEach((comic) => {
      if ((activeLanguage === "All Languages" || comic.language === activeLanguage) && (activeDecade === "All Decades" || getDecade(comic.year)?.toString() === activeDecade)) {
        genreMap[comic.series] = (genreMap[comic.series] || 0) + 1;
      }
    });
    const total = Object.values(genreMap).reduce((a, b) => a + b, 0);
    return { "All Genres": total, ...genreMap };
  };

  const computeLanguageCounts = () => {
    const langMap = {};
    popularComics.forEach((comic) => {
      if ((activeGenre === "All Genres" || comic.series === activeGenre) && (activeDecade === "All Decades" || getDecade(comic.year)?.toString() === activeDecade)) {
        langMap[comic.language] = (langMap[comic.language] || 0) + 1;
      }
    });
    const total = Object.values(langMap).reduce((a, b) => a + b, 0);
    return { "All Languages": total, ...langMap };
  };

  const computeDecadeCounts = () => {
    const decadeMap = {};
    popularComics.forEach((comic) => {
      if ((activeGenre === "All Genres" || comic.series === activeGenre) && (activeLanguage === "All Languages" || comic.language === activeLanguage)) {
        const decade = getDecade(comic.year);
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

  // Apply filters
  useEffect(() => {
    let filtered = [...popularComics];

    if (activeGenre !== "All Genres") {
      filtered = filtered.filter((comic) => comic.series === activeGenre);
    }

    if (activeLanguage !== "All Languages") {
      filtered = filtered.filter((comic) => comic.language === activeLanguage);
    }

    if (activeDecade !== "All Decades") {
      filtered = filtered.filter((comic) => getDecade(comic.year)?.toString() === activeDecade);
    }

    setFilteredComic(filtered);
  }, [activeGenre, activeLanguage, activeDecade, popularComics, setFilteredComic]);

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
