import React from 'react';
import styles from './UpperPlate.module.scss';
import {SmallAvatar} from "../MessageContainer/SmallAvatar/SmallAvatar";
import {BorderButton} from "../../../UI/BorderButton/BorderButton";
import {CryptContext, WindowContext} from "../../../../App";
import {WINDOWS} from "../../../../constants/constants";
import {socket} from "../../../../App";

export const UpperPlate = React.memo(props => {

  const contextWindow = React.useContext(WindowContext);

  const contextCrypt = React.useContext(CryptContext);

  const backHandler = () => {
    socket.emit('escapeChat');
    contextWindow.setWindowPlate(WINDOWS.TAGS_EDITOR);
  };

  return (
    <div id={'upperPlate'} className={styles.plate}>
      <BorderButton onClick={ backHandler } text={'Back'}/>
      <div className={styles.user}>
        <div className={styles.name}>{props.name}</div>
        {
          contextCrypt && <div className={styles.status}>protected</div>
        }
      </div>
      <div className={styles.avatar}><SmallAvatar yours={ false } /></div>
    </div>
  );
});