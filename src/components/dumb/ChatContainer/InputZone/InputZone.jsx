import React from 'react';
import styles from './InputZone.module.scss';
import Textarea from 'react-textarea-autosize';

let initialHeightBuild = true;

export const InputZone = React.memo(props => {

  React.useEffect(() => {
    initialHeightBuild = true;
  }, []);

  const textArea = React.useRef();

  const [text, changeText] = React.useState('');

  const [buttonHeight, buttonHeightSet] = React.useState(0);

  const changeHandler = e => changeText(e.target.value);

  const heightSetter = height => {
    initialHeightBuild && buttonHeightSet(height);
    initialHeightBuild = false;
  };

  const sendClickHandler = e => {
    textArea.current.focus();
    if ( text.length > 0 ) {
      props.sendMessage(text);
      changeText('');
    }
  };

  return(
    <div className={styles.zone}>
      <Textarea
        inputRef={textArea}
        className={styles.text}
        value={text}
        onChange={ changeHandler }
        onHeightChange={ heightSetter }
      />
      <button
        style={{height: `${buttonHeight}px`}}
        className={styles.send}
        onClick={sendClickHandler}
      >
        send
      </button>
    </div>
  );
});