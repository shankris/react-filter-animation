import { useContext, useState } from "react";
import { MovieContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   show: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.95 },
// };

const Movies = () => {
  const { filteredMovie } = useContext(MovieContext);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className='movie-grid'>
      <AnimatePresence>
        {filteredMovie.map((movie, index) => {
          const key = `${movie.Image}-${index}`;
          const lowRes = `/images/movies_LowRes/${movie.Image}.jpg`;
          const highRes = `/images/movies/${movie.Image}.jpg`;

          return (
            <motion.div
              key={key}
              className='image-card'
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='image-wrapper'>
                <img
                  src={lowRes}
                  alt={`${movie.Movie} low-res`}
                  className='low-res'
                />
                <img
                  src={highRes}
                  alt={movie.Movie}
                  className={`high-res ${loadedImages[key] ? "visible" : ""}`}
                  onLoad={() => handleImageLoad(key)}
                />
              </div>
              <div className='title'>{movie.Movie}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Movies;
