import React from 'react';
import styles from './UserPlate.module.scss';

export const UserPlate = props => {

  return(
    <div className={styles.user}>
      <div className={styles.avatar}/>
      <div className={styles.name}>Ilya Platonov</div>
    </div>
  );
};