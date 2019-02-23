import React from 'react';
import styles from './FindButton.module.scss';
import {SocketContext, UserContext, WindowContext} from "../../../../App";
import {WINDOWS} from "../../../../constants/constants";

export const FindButton = props => {

  const contextWindow = React.useContext(WindowContext);

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  const socket = React.useContext(SocketContext);

  const [touched, setTouched] = React.useState(false);

  const touchedHandler = () => setTouched(true);

  const unTouchedHandler = () => {
    setTouched(false);
  };

  const findChat = () => {
    socket.emit('findChat', { user: user });
    contextWindow.setWindow(WINDOWS.PRE_CHAT);
  };

  return(
    <button
      className={`${styles.find} ${touched ? styles.touched : ''}`}
      onTouchStart={ touchedHandler }
      onTouchEnd={ unTouchedHandler }
      onClick={ findChat }
      disabled={ user.tags.length <= 0 || user.name.length <= 0 }
    >
      find chat
    </button>
  );
};