import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ComicModal.module.css";

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

                  {Object.entries(comic).map(([key, value], index, array) => {
                    if (["key", "title", "link"].includes(key)) return null;

                    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

                    const isLast = index === array.length - 1;

                    return (
                      <div
                        key={key}
                        className={`${styles.detailRow} ${isLast ? styles.fullRow : ""}`}
                      >
                        <strong>{label}:</strong> <span>{value}</span>
                      </div>
                    );
                  })}

                  <button
                    className={styles.closeButton}
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
