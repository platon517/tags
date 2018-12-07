import React from 'react';
import styles from './MessagesZone.module.scss';
import {MessageContainer} from "../MessageContainer/MessageContainer";

const combineMessagesById = messages => {
  const messagesById = [];

  messages.reduce( (nowId, mes) => {
    if (nowId !== mes.senderId) {
      messagesById.push({
        senderId: mes.senderId,
        messages: []
      })
    }
    messagesById[messagesById.length - 1].messages.push(mes);
    return mes.senderId;
  }, null);

  return messagesById;
};

export const MessagesZone = props => {

  const { messages } = props;

  const myId = 0;

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.zone}>
        {
          combineMessagesById(messages).map(
            (item, index) =>
              <MessageContainer
                key={ index }
                yours={ item.senderId === myId }
                messages={ item.messages }
              />
          )
        }
      </div>
    </div>
  );
};