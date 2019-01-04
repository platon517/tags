import React from 'react';
import styles from './FindButton.module.scss';
import {WindowContext} from "../../../../App";
import {WINDOWS} from "../../../../constants/constants";

export const FindButton = props => {

  const contextWindow = React.useContext(WindowContext);

  const [touched, setTouched] = React.useState(false);

  const touchedHandler = () => setTouched(true);

  const unTouchedHandler = () => {
    setTouched(false);
  };

  const findChat = () => {
    contextWindow.setWindow(WINDOWS.PRE_CHAT);
  };

  return(
    <button
      className={`${styles.find} ${touched ? styles.touched : ''}`}
      onTouchStart={ touchedHandler }
      onTouchEnd={ unTouchedHandler }
      onClick={ findChat }
    >
      find chat
    </button>
  );
};