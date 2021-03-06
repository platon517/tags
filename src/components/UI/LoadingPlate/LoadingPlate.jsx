import React from 'react';
import styles from './LoadingPlate.module.scss';
import {socket, WindowContext} from "../../../App";
import {WINDOWS} from "../../../constants/constants";
import {BorderButton} from "../../UI/BorderButton/BorderButton";

export const LoadingPlate = () => {

  const contextWindow = React.useContext(WindowContext);

  const backHandler = () => {
    socket.emit('cancelSearch');
    contextWindow.setWindowPlate(WINDOWS.TAGS_EDITOR);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BorderButton onClick={ backHandler } text={'Back'}/>
      </div>
      <div className={styles.spinnerBg}/>
    </div>
  );

};