import React from 'react';
import styles from './InputZone.module.scss';
import Textarea from 'react-textarea-autosize';

let initialHeightBuild = true;

export const InputZone = props => {

  const [text, changeText] = React.useState('');

  const [buttonHeight, buttonHeightSet] = React.useState(0);

  const changeHandler = e => changeText(e.target.value);

  const test = height => {
    initialHeightBuild && buttonHeightSet(height);
    initialHeightBuild = false;
  };

  return(
    <div className={styles.zone}>
      <Textarea
        className={styles.text}
        value={text}
        onChange={ changeHandler }
        onHeightChange={ test }
        //minRows={2}
      />
      <button style={{height: `${buttonHeight}px`}} className={styles.send}>send</button>
    </div>
  );
};