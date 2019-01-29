import React from 'react';
import styles from './UpperPlate.module.scss';
import {SmallAvatar} from "../MessageContainer/SmallAvatar/SmallAvatar";
import {BorderButton} from "../../../UI/BorderButton/BorderButton";
import {SocketContext, WindowContext} from "../../../../App";
import {WINDOWS} from "../../../../constants/constants";

export const UpperPlate = React.memo(props => {

  const socket = React.useContext(SocketContext);

  const contextWindow = React.useContext(WindowContext);

  const backHandler = () => {
    socket.emit('escapeChat');
    contextWindow.setWindow(WINDOWS.TAGS_EDITOR);
  };

  return (
    <div id={'upperPlate'} className={styles.plate}>
      <BorderButton onClick={ backHandler } text={'Back'}/>
      <div className={styles.user}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.status}>online</div>
      </div>
      <div className={styles.avatar}><SmallAvatar yours={ false } /></div>
    </div>
  );
});