import React from 'react';
import styles from './SmallAvatar.module.scss';

export const SmallAvatar = props => {
  return(
    <div className={`${styles.avatar} ${props.yours ? styles.self : styles.nonSelf}`}>
      {
        //<img/>
      }
    </div>
  );
};