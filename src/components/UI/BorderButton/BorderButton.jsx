import React from 'react';
import styles from './BorderButton.module.scss';

export const BorderButton = React.memo(
  props => <button className={styles.back}>{props.text}</button>
);