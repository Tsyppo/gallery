import React, { useState, useEffect } from 'react';
import { paintingAPI } from '../services/PaintingService';
import { authorsAPI } from '../services/AuthorsService';
import { locationsAPI } from '../services/LocationsService';
import styles from '../components/styles/ArtGallery.module.scss';
import SingleArt from './SingleArt';
import Pagination from './Pagination';
import { useTheme } from '../context/ThemeContext';
import Search from './assets/icons/search.svg?react';

const ArtGallery: React.FC = () => {
  const { isDarkTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');

  const { data: paintingsData, isLoading } = paintingAPI.useFetchPaintingsQuery(
    {
      limit: postsPerPage,
      page: currentPage,
      q: searchTerm || undefined,
    }
  );

  const { data: authors } = authorsAPI.useFetchAllAuthorsQuery();
  const { data: locations } = locationsAPI.useFetchAllLocationsQuery();

  const getAuthorById = (id: number) => {
    return (
      authors?.find((author) => author.id === id)?.name || 'Unknown Author'
    );
  };

  const getLocationById = (id: number) => {
    return (
      locations?.find((location) => location.id === id)?.location ||
      'Unknown Location'
    );
  };

  const totalPages = Math.ceil((paintingsData?.totalCount || 0) / postsPerPage);

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div
      className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}
    >
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Painting title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm.length > 0 && (
          <button className={styles.clearButton} onClick={handleClearSearch}>
            &times;
          </button>
        )}
      </div>
      <div className={styles.galleryContainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : paintingsData?.data?.length === 0 ? (
          <div className={styles.massageNoMatches}>
            <p className={styles.noMatchesText}>
              No matches for <strong>{searchTerm}</strong>
            </p>
            <p className={styles.suggestionText}>
              Please try again with a different spelling or keywords.
            </p>
          </div>
        ) : (
          paintingsData?.data?.map((post) => (
            <SingleArt
              key={post.id}
              post={post}
              authorName={getAuthorById(post.authorId)}
              locationName={getLocationById(post.locationId)}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArtGallery;
