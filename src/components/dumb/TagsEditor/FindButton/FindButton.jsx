import React from 'react';
import styles from './FindButton.module.scss';

export const FindButton = props => {

  const [touched, setTouched] = React.useState(false);

  const touchedHandler = () => setTouched(true);

  const unTouchedHandler = () => setTouched(false);

  return(
    <button
      className={`${styles.find} ${touched ? styles.touched : ''}`}
      onTouchStart={ touchedHandler }
      onTouchEnd={ unTouchedHandler }
    >
      find chat
    </button>
  );
};