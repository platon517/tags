import React from 'react';
import styles from './MessageBubble.module.scss'

export const MessageBubble = React.memo(props => (
  <div
    className={`${styles.bubble} ${props.yours ? styles.self : styles.nonSelf}`}
  >
    {props.text}
  </div>
));