import React from 'react';
import styles from './MessageContainer.module.scss'
import {MessageBubble} from "./MessageBubble/MessageBubble";
import {SmallAvatar} from "./SmallAvatar/SmallAvatar";

export const MessageContainer = props => (
  <div
    className={styles.container}
    style={{
      alignSelf: props.yours ? 'flex-end' : 'flex-start',
      alignItems: props.yours ? 'flex-end' : 'flex-start',
    }}
  >
    <SmallAvatar yours={ props.yours } />
    {
      props.messages.map(
        item =>
          <MessageBubble key={ item.id} yours={ props.yours } >
            { item.text }
          </MessageBubble>
      )
    }
  </div>
);