import { useContext } from "react";
import { ComicContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";

const Comics = () => {
  const { filteredComic } = useContext(ComicContext);

  return (
    <div className='comicGrid'>
      <AnimatePresence>
        {filteredComic.map((comic) => (
          <motion.div
            key={comic.key} // ✅ Using the new unique key
            className='image-card'
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='image-wrapper'>
              <img
                src={comic.link}
                alt={comic.title}
                className='low-res'
                loading='lazy'
              />
            </div>
            <div className='title'>{comic.title}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Comics;
