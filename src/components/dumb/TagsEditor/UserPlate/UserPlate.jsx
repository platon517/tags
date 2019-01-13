import React from 'react';
import styles from './UserPlate.module.scss';
import AutosizeInput from 'react-input-autosize';
import {UserContext} from "../../../../App";

export const UserPlate = React.memo(props => {

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  const changeHandler = e => e.target.value.length < 20 && contextUser.updateName(e.target.value);

  return(
    <div className={styles.user}>
      <div className={styles.avatar}/>
      <div className={styles.name}>
        <AutosizeInput onChange={changeHandler} style={{ fontSize: '1.1em' }} placeholder={'Your name'} value={user.name}/>
      </div>
    </div>
  );
});