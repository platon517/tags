import React from 'react';
import styles from './NoConnection.module.scss';
import img from '../../../img/svg/unplugged.svg';

export const NoConnection = React.memo(() => {
  return(
    <div className={styles.container}>
      <div className={styles.block}>
        <img alt={'No Connection'} src={img}/>
      </div>
      <div className={styles.text}>Trying to connect</div>
    </div>
  )
});