import React from 'react';
import styles from './AvatarCircle.module.scss';
import {AvatarsContext, FoundUserContext, UserContext} from "../../../../App";

export const AvatarCircle  = props => {

  const contextFoundUser = React.useContext(FoundUserContext);

  const foundUser = contextFoundUser.self;

  const contextAvatars = React.useContext(AvatarsContext);

  return(
    <div className={styles.container}>
      <div className={styles.avatar} style={{backgroundImage: `url(${contextAvatars[foundUser.avatar]})`}} />
      <div className={styles.name}>{props.name}</div>
    </div>
  );
};