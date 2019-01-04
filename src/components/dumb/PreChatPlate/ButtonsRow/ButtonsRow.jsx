import React from 'react';
import styles from './ButtonsRow.module.scss';

export const ButtonsRow = React.memo(props => {
  return(
    <div className={styles.row}>
      <button onClick={props.nextHandler} className={styles.button_next}>next</button>
      <button onClick={props.startHandler} className={styles.button_start}>start chat</button>
    </div>
  );
});