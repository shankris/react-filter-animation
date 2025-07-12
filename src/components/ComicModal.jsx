import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ComicModal.module.css";
import Ripple from "./Ripple";

export default function ComicModal({ comic, onClose }) {
  const modalRef = useRef();

  // 🔐 ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 🖱️ Click outside to close
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // 🛑 Prevent body scroll when modal is open
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <AnimatePresence>
      {comic && (
        <>
          {/* 🔲 Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* 🧲 Wrapper centers modal */}
          <motion.div
            className={styles.modalWrapper}
            onClick={handleClickOutside}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 📦 Actual modal box */}
            <motion.div
              className={styles.modal}
              layoutId={`card-${comic.key}`}
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalContent}>
                {/* Left section */}
                <div className={styles.leftPane}>
                  <img
                    src={comic.link}
                    alt={comic.title}
                    className={styles.coverImage}
                  />
                </div>

                {/* Right section */}
                <div className={styles.rightPane}>
                  <h2>{comic.title}</h2>

                  {Object.entries(comic).map(([key, value]) => {
                    if (["key", "title", "link"].includes(key)) return null;

                    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

                    const isDescription = key === "description";

                    return (
                      <div
                        key={key}
                        className={`${styles.detailRow} ${isDescription ? styles.fullRow : ""}`}
                      >
                        <strong>{label}:</strong>
                        <span>{value}</span>
                      </div>
                    );
                  })}

                  <Ripple
                    as='button'
                    className={styles.closeButton}
                    onClick={() => {
                      // ⏱️ Delay closing the modal by ~300–400ms to allow ripple to complete
                      setTimeout(() => {
                        onClose();
                      }, 300); // match with ripple duration in CSS
                    }}
                    rippleColor='rgba(255, 255, 255, 0.4)' // lighter ripple
                  >
                    Close
                  </Ripple>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
