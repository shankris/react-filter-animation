import { useEffect, useState, useRef } from "react";
import styles from "./AutoSuggest.module.css";
import { Search, X } from "lucide-react";

export default function AutoSuggest() {
  const [comics, setComics] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef();

  // Load comics data from public folder
  useEffect(() => {
    fetch("/data/comics.json")
      .then((res) => res.json())
      .then((data) => setComics(data))
      .catch((err) => console.error("Failed to load comics.json:", err));
  }, []);

  // Filter suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setHighlightedIndex(-1);

    if (value.length > 1) {
      const filtered = comics.filter((comic) => {
        const haystack = `${comic.title} ${comic.writer} ${comic.desc}`.toLowerCase();
        return haystack.includes(value.toLowerCase());
      });
      setResults(filtered.slice(0, 6));
    } else {
      setResults([]);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const selected = results[highlightedIndex];
      alert(`Selected: ${selected.title}`);
      setQuery("");
      setResults([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Search
          className={styles.searchIcon}
          size={16}
        />

        <input
          type='text'
          placeholder='Search comics...'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />

        {/* Clear Button: shows only when query has content */}
        {query && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            aria-label='Clear search'
          >
            <X size={16} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul
          className={styles.dropdown}
          ref={listRef}
        >
          {results.map((comic, index) => (
            <li
              key={comic.key}
              className={`${styles.item} ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              <img
                src={comic.link}
                alt={comic.title}
                className={styles.cover}
              />
              <div className={styles.info}>
                <div className={styles.title}>{comic.title}</div>
                <div className={styles.subtitle}>
                  {comic.series} <br /> {comic.writer}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
