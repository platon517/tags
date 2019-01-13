import React from 'react';
import styles from './ChatContainer.module.scss';
import {MessagesZone} from "./MessagesZone/MessagesZone";
import {InputZone} from "./InputZone/InputZone";
import {UpperPlate} from "./UpperPlate/UpperPlate";
import {FoundUserContext, WindowContext} from "../../../App";
import {WINDOWS} from "../../../constants/constants";

export const ChatContainer = React.memo(props => {

  const contextFoundUser = React.useContext(FoundUserContext);

  const foundUser = contextFoundUser.self;

  const [messages, setMessages] = React.useState(
    [
      {
        id: 0,
        senderId: 0,
        text: 'Hello! Show bobs and vagana!',
        attachments: []
      },
      {
        id: 0,
        senderId: 1,
        text: 'No way, perv!',
        attachments: []
      },
    ]
  );

  const sendMessage = text => {
    setMessages(
      messages.concat({
        id: 4,
        senderId:0,
        text: text,
        attachments: []
      })
    );
  };

  return(
    <div className={styles.container}>
      <UpperPlate name={foundUser.name}/>
      <MessagesZone messages={messages}/>
      <InputZone sendMessage={sendMessage}/>
    </div>
  );
});