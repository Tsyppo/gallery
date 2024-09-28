import React from 'react';
import styles from '../components/styles/Pagination.module.scss';
import { useTheme } from '../context/ThemeContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isDarkTheme } = useTheme();
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    const createPageButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        className={`${styles.pageNumber} ${
          currentPage === pageNumber ? styles.active : ''
        }`}
        onClick={() => paginate(pageNumber)}
      >
        {pageNumber}
      </button>
    );

    const createDots = (key: string) => (
      <span key={key} className={styles.dots}>
        ...
      </span>
    );

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i < 4; i++) {
          pages.push(createPageButton(i));
        }
        if (currentPage === 3) {
          pages.push(createPageButton(currentPage + 1));
        }
        pages.push(createDots('dots-1'));
        pages.push(createPageButton(totalPages));
      } else if (currentPage >= totalPages - 2) {
        pages.push(createPageButton(1));
        pages.push(createDots('dots-1'));
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(createPageButton(i));
        }
      } else {
        pages.push(createPageButton(1));
        pages.push(createDots('dots-1'));
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(createPageButton(i));
        }
        pages.push(createDots('dots-2'));
        pages.push(createPageButton(totalPages));
      }
    }
    return pages;
  };

  return (
    <div
      className={`${styles.pagination} ${styles.left} ${isDarkTheme ? styles.dark : styles.light}`}
    >
      <button
        type="button"
        className={`${styles.pageArrow} ${styles.left}`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {renderPageNumbers()}
      <button
        type="button"
        className={styles.pageArrow}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
