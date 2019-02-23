import React from 'react';
import styles from './SmallAvatar.module.scss';
import {AvatarsContext, FoundUserContext, UserContext} from "../../../../../App";

export const SmallAvatar = props => {

  const contextFoundUser = React.useContext(FoundUserContext);

  const foundUser = contextFoundUser.self;

  const contextAvatars = React.useContext(AvatarsContext);

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  return(
    <div
      className={`${styles.avatar} ${props.yours ? styles.self : styles.nonSelf}`}
      style={{
        backgroundImage: props.yours ?
          `url(${contextAvatars[user.avatar]})`
          :
          `url(${contextAvatars[foundUser.avatar]})`
      }}
    >
      {
        //<img/>
      }
    </div>
  );
};