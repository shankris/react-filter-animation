import { useState } from "react";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";
import AutoSuggest from "./AutoSuggest"; // 🔍 Make sure this file exists

const Header = ({ onToggleSidebar }) => {
  return (
    <header className={styles.header}>
      {/* Left: Logo / Title */}
      <div className={styles.title}>
        200<span className={styles.second}>Comics</span> <span>v0.1</span>
      </div>

      {/* Center: Search Box */}
      <div className={styles.searchContainer}>
        <AutoSuggest />
      </div>

      {/* Right: Menu Button */}
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
