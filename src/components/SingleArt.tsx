import { FC } from 'react';
import { IPainting } from '../models/IPainting';
import styles from '../components/styles/SingleArt.module.scss';
import { useTheme } from '../context/ThemeContext';

interface PostInemsProps {
  post: IPainting;
  authorName: string;
  locationName: string;
}

const SingleArt: FC<PostInemsProps> = ({ post, authorName, locationName }) => {
  const { isDarkTheme } = useTheme();

  const baseUrl = 'https://test-front.framework.team';

  return (
    <div
      className={`${styles.artContainer}  ${isDarkTheme ? styles.dark : styles.light}`}
    >
      <img
        src={`${baseUrl}${post.imageUrl}`}
        alt={post.name}
        className={styles.artImage}
      />
      <div className={styles.textOverlay}>
        <div className={styles.leftBar} />
        <div className={styles.artDetails}>
          <h1 className={styles.artTitle}>{post.name}</h1>
          <span className={styles.artYear}>{post.created}</span>
          <h1 className={styles.authorName}>{`${authorName}`}</h1>
          <p className={styles.locationName}>{`${locationName}`}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleArt;
