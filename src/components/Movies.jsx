import { useContext } from "react";
import { MovieContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";

const Movies = () => {
  const { filteredMovie } = useContext(MovieContext);

  return (
    <div className='movie-grid'>
      <AnimatePresence>
        {filteredMovie.map((movie, index) => {
          const key = movie.Image;
          const lowRes = `/images/movies_LowRes/${movie.Image}.jpg`;

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
                  alt={movie.Movie}
                  className='low-res'
                  loading='lazy'
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
