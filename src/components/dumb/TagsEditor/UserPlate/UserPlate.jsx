import React from 'react';
import styles from './UserPlate.module.scss';
import {UserContext} from "../../../../App";

export const UserPlate = React.memo(props => {

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  return(
    <div className={styles.user}>
      <div className={styles.avatar}/>
      <div className={styles.name}>{ user.name }</div>
    </div>
  );
});