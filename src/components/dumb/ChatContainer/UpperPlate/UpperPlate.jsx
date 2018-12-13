import React from 'react';
import styles from './UpperPlate.module.scss';
import {SmallAvatar} from "../MessageContainer/SmallAvatar/SmallAvatar";

export const UpperPlate = React.memo(props => {
  return (
    <div id={'upperPlate'} className={styles.plate}>
      <button className={styles.back}>Back</button>
      <div className={styles.user}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.status}>online</div>
      </div>
      <div className={styles.avatar}><SmallAvatar yours={ false } /></div>
    </div>
  );
});