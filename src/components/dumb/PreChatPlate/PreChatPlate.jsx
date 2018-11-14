import React from 'react';
import styles from './PreChatPlate.module.scss';
import {TagSmallPlate} from "../TagSmallPlate/TagSmallPlate";
import {AvatarCircle} from "./AvatarCircle/AvatarCircle";
import {ButtonsRow} from "./ButtonsRow/ButtonsRow";

export const PreChatPlate = props => {

  const { tags, name } = props;

  let [next, setNext] = React.useState(false);

  const nextHandler = () => setNext(true);

  return(
    <div className={`${styles.searchPlate} ${next ? styles.searchPlateNext : ''}`}>
      <div className={styles.avatar}>
        <AvatarCircle name={name}/>
      </div>
      <div className={styles.tags}>
        <span className={styles.tags_container}>
          {
            tags.map( (item, index) => <TagSmallPlate {...item} index={index}/> )
          }
        </span>
      </div>
      <ButtonsRow nextHandler={nextHandler}/>
    </div>
  );
};