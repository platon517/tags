import React from 'react';
import styles from './InputZone.module.scss';

export const InputZone = props => {

  const [text, changeText] = React.useState('');

  const changeHandler = e => changeText(e.target.value);

  return(
    <div className={styles.zone}>
      <textarea
        className={styles.text}
        value={text}
        onChange={ changeHandler }
      />
      <button className={styles.send}>send</button>
    </div>
  );
};