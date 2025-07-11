import { useState } from "react";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        Comix <span>v0.1</span>
      </div>
      <button
        className={styles.menuButton}
        onClick={onToggleSidebar}
        aria-label='Toggle Sidebar'
      >
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;
