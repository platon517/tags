import React from 'react';
import styles from './AvatarCircle.module.scss';

export const AvatarCircle  = props => {
  return(
    <div className={styles.container}>
      <div className={styles.avatar} />
      <div className={styles.name}>{props.name}</div>
    </div>
  );
};