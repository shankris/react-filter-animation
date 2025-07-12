import { useContext, useState, useEffect } from "react";
import { ComicContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import ComicModal from "./ComicModal";

const Comics = () => {
  const { filteredComic } = useContext(ComicContext);
  const [selectedComic, setSelectedComic] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false); // 🧿 Prevent reanimation

  useEffect(() => {
    const timeout = setTimeout(() => setHasLoaded(true), 500); // delay for smoother effect
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className='comicGrid'>
        {filteredComic.map((comic) => (
          <div
            key={comic.key}
            className='image-card'
            onClick={() => setSelectedComic(comic)}
          >
            {/* ✅ Only animate this image for zoom */}
            <motion.div
              layoutId={`card-${comic.key}`}
              className='image-wrapper'
            >
              <img
                src={comic.link}
                alt={comic.title}
                className='low-res'
                loading='lazy'
              />
            </motion.div>

            {/* ✅ Animate opacity only on first mount */}
            <motion.div
              className='title'
              initial={!hasLoaded ? { opacity: 0 } : false}
              animate={!hasLoaded ? { opacity: 1 } : false}
              transition={{ duration: 0.5 }}
            >
              {comic.title}
            </motion.div>
          </div>
        ))}
      </div>

      <ComicModal
        comic={selectedComic}
        onClose={() => setSelectedComic(null)}
      />
    </>
  );
};

export default Comics;
