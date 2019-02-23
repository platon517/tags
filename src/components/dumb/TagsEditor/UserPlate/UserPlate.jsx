import React from 'react';
import styles from './UserPlate.module.scss';
import AutosizeInput from 'react-input-autosize';
import {AvatarsContext, UserContext} from "../../../../App";

export const UserPlate = React.memo(props => {

  const contextUser = React.useContext(UserContext);

  const contextAvatars = React.useContext(AvatarsContext);

  const user = contextUser.self;

  const avatarClickHandler = () =>
    contextUser.updateAvatar(user.avatar >= contextAvatars.length - 1 ? 0 : user.avatar + 1);

  const changeHandler = e => e.target.value.length < 20 && contextUser.updateName(e.target.value);

  return(
    <div className={styles.user}>
      <div
        onClick={avatarClickHandler}
        className={styles.avatar}
        style={{backgroundImage: `url(${contextAvatars[user.avatar]})`}}
      />
      <div className={styles.name}>
        <AutosizeInput onChange={changeHandler} style={{ fontSize: '1.1em' }} placeholder={'Your name'} value={user.name}/>
      </div>
    </div>
  );
});