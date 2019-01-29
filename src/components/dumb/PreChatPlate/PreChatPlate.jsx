import React from 'react';
import styles from './PreChatPlate.module.scss';
import {TagSmallPlate} from "../TagSmallPlate/TagSmallPlate";
import {AvatarCircle} from "./AvatarCircle/AvatarCircle";
import {ButtonsRow} from "./ButtonsRow/ButtonsRow";
import {BorderButton} from "../../UI/BorderButton/BorderButton";
import {WINDOWS} from "../../../constants/constants";
import {FoundUserContext, SocketContext, WindowContext} from "../../../App";
import {LoadingPlate} from "../../UI/LoadingPlate/LoadingPlate";

export const PreChatPlate = props => {

  const socket = React.useContext(SocketContext);

  const contextWindow = React.useContext(WindowContext);

  const contextFoundUser = React.useContext(FoundUserContext);

  const foundUser = contextFoundUser.self;

  const backHandler = () => {
    socket.emit('cancelSearch');
    contextWindow.setWindow(WINDOWS.TAGS_EDITOR);
  };

  const startHandler = () => {
    contextWindow.setWindow(WINDOWS.CHAT);
    socket.emit('startChat', { pair: foundUser });
  };

  let [next, setNext] = React.useState(false);

  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //setTimeout(() => setLoading(false), 1000);
  }, []);

  const nextHandler = () => {
    socket.emit('nextSubmission');
    setNext(true);
  };

  return(
    (loading && !foundUser) ?
      <LoadingPlate/>
      :
      <>
        { next && <LoadingPlate/> }
        <div className={`${styles.searchPlate} ${next ? styles.searchPlateNext : ''}`}>
          <div className={styles.topNav}><BorderButton onClick={ backHandler } text={'Back'}/></div>
          <div className={styles.avatar}>
            <AvatarCircle name={foundUser.name}/>
          </div>
          <div className={styles.tags}>
            <span className={styles.tags_container}>
              {
                foundUser.tags.map( (item, index) => <TagSmallPlate key={index} {...item} index={index}/> )
              }
            </span>
          </div>
          <ButtonsRow nextHandler={nextHandler} startHandler={ startHandler }/>
        </div>
      </>
  );
};