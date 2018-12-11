import React from 'react';
import styles from './UpperPlate.module.scss';

export const UpperPlate = props => {
  return (
    <div className={styles.plate}>
      <div className={styles.back}>Back</div>
      <div className={styles.name}>{props.name}</div>
    </div>
  );
};