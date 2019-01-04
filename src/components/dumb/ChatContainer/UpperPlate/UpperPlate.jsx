import React from 'react';
import styles from './UpperPlate.module.scss';
import {SmallAvatar} from "../MessageContainer/SmallAvatar/SmallAvatar";
import {BorderButton} from "../../../UI/BorderButton/BorderButton";
import {WINDOWS} from "../../../../constants/constants";
import {WindowContext} from "../../../../App";

export const UpperPlate = React.memo(props => {

  const contextWindow = React.useContext(WindowContext);

  const backHandler = () => {
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