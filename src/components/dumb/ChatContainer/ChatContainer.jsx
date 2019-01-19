import React from 'react';
import styles from './ChatContainer.module.scss';
import {MessagesZone} from "./MessagesZone/MessagesZone";
import {InputZone} from "./InputZone/InputZone";
import {UpperPlate} from "./UpperPlate/UpperPlate";
import {FoundUserContext, SocketContext, UserContext, WindowContext} from "../../../App";
import {WINDOWS} from "../../../constants/constants";

export const ChatContainer = React.memo(props => {

  const socket = React.useContext(SocketContext);

  const contextFoundUser = React.useContext(FoundUserContext);

  const foundUser = contextFoundUser.self;

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  const [isWaiting, setIsWaiting] = React.useState(true);

  /*
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
   */

  socket.on('partnerIsReady', () => {
    setIsWaiting(false);
  });

  const [messages, setMessages] = React.useState([]);

  socket.on('message', msg => {
    console.log(msg);
    setMessages(
      messages.concat({
        id: msg.id,
        senderId: msg.senderId,
        text: msg.text,
        attachments: []
      })
    );
  });

  const sendMessage = text => {
    console.log(user);
    setMessages(
      messages.concat({
        id: messages.length,
        senderId: user.id,
        text: text,
        attachments: []
      })
    );
    socket.emit('message', {
      senderId: user.id,
      pair: foundUser,
      message: {
        text: text
      },
    });
  };

  return(
    <div className={styles.container}>
      <UpperPlate name={foundUser.name}/>
      { isWaiting && <span className={styles.waitLine}>Waiting for partner...</span> }
      <MessagesZone messages={messages}/>
      <InputZone sendMessage={sendMessage}/>
    </div>
  );
});