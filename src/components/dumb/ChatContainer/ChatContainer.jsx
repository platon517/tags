import React from 'react';
import styles from './ChatContainer.module.scss';
import {MessagesZone} from "./MessagesZone/MessagesZone";
import {InputZone} from "./InputZone/InputZone";

const messages = [
  {
    id: 0,
    senderId: 0,
    text: 'Hello! Show bobs and vagana!',
    attachments: []
  },
  {
    id: 1,
    senderId: 0,
    text: 'I do really need your bobs and vagana girl. My uncle is in a vary bad condition. jdskjn jwned wkjendjw ',
    attachments: []
  },
  {
    id: 0,
    senderId: 1,
    text: 'No way, perv!',
    attachments: []
  },
  {
    id: 2,
    senderId: 0,
    text: 'I can show you my bim-bom babi ;)',
    attachments: []
  },
  {
    id: 1,
    senderId: 1,
    text: 'Show your bim-bom someone else, please.',
    attachments: []
  },
  {
    id: 3,
    senderId: 0,
    text: 'Ok, I will photo him in a feu moments!',
    attachments: []
  },
  {
    id: 2,
    senderId: 1,
    text: 'Ur blocked, wierdo',
    attachments: []
  },
];


export const ChatContainer = props => {

  return(
    <div className={styles.container}>
      <MessagesZone messages={messages}/>
      <InputZone/>
    </div>
  );
};