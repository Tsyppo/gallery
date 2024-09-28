/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import styles from '../components/styles/Layout.module.scss';
import Logo from './assets/icons/logo.svg?react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.layoutContainer} ${isDarkTheme ? styles.dark : styles.light}`}
    >
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
        />
      </header>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default Layout;
