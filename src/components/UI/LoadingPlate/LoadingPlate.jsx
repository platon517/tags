import React from 'react';
import styles from './LoadingPlate.module.scss';

export const LoadingPlate = () =>
  <div className={styles.container}>
    <div className={styles.spinnerBg}/>
  </div>;