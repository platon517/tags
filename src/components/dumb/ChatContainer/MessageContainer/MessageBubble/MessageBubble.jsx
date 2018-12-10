import React from 'react';
import styles from './MessageBubble.module.scss'

export const MessageBubble = props => (
  <div
    className={`${styles.bubble} ${props.yours ? styles.self : styles.nonSelf}`}
  >
    {props.children}
  </div>
);