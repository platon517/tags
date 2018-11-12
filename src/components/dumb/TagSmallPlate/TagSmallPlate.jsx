import React from 'react';
import styles from './TagSmallPlate.module.scss';

export const TagSmallPlate = props => {
  const { name, index } = props;
  const [extraClass, setExtraClass] = React.useState('');

  const spawn = () => setTimeout(() => setExtraClass(styles.spawned), (index + 1) * 100 + getRandomInt(100, 300));

  React.useEffect(() => {
    spawn();
  }, []);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return(
    <div className={`${styles.smallTag} ${extraClass}`}>
      <div className={styles.angle}/>
      <div className={styles.body}>{name}</div>
      <div className={styles.hole}/>
    </div>
  );
};