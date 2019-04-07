import React from 'react';
import styles from './ChatContainer.module.scss';
import {MessagesZone} from "./MessagesZone/MessagesZone";
import {InputZone} from "./InputZone/InputZone";
import {UpperPlate} from "./UpperPlate/UpperPlate";
import {CryptContext, FoundUserContext, SocketContext, UserContext} from "../../../App";

export const ChatContainer = React.memo(props => {

  const socket = React.useContext(SocketContext);

  const contextFoundUser = React.useContext(FoundUserContext);

  const contextCrypt = React.useContext(CryptContext);

  const foundUser = contextFoundUser.self;

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  const [isWaiting, setIsWaiting] = React.useState(true);

  const [messages, setMessages] = React.useState([]);

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

  React.useEffect(() => {
    socket.emit('startChat', { pair: foundUser });
    socket.on('message', getMessage);
    socket.on('partnerIsReady', () => {
      setIsWaiting(false);
      contextCrypt.createKeys();
      contextCrypt.sendHandshake(publicKey => {
        socket.emit('sendPublicKey', {pair: foundUser, publicKey});
      });
    });
    socket.on('getPublicKey', publicKey => {
      contextCrypt.receiveHandshake(publicKey);
    });
  }, [socket, foundUser.id]);

  const getMessage = msg => {
    console.log(`encrypted message: ${msg.text}`);
    setMessages(
      messages => [...messages, {
        id: msg.id,
        senderId: msg.senderId,
        text: contextCrypt.decrypt(JSON.parse(msg.text)),
        attachments: []
      }]
    );
  };

  const sendMessage = text => {
    if(!text.replace(/ /g,'').length) return false;
    setMessages(
      messages => [...messages, {
        id: messages.length,
        senderId: user.id,
        text: text,
        attachments: []
      }]
    );
    socket.emit('message', {
      senderId: user.id,
      pair: foundUser,
      message: {
        text: JSON.stringify(contextCrypt.encrypt(text))
      },
    });
  };

  return(
    <div className={styles.container}>
      <UpperPlate name={foundUser.name}/>
      { isWaiting && <span className={styles.waitLine}>Waiting for partner...</span> }
      <MessagesZone messages={messages}/>
      { !isWaiting && <InputZone sendMessage={sendMessage}/> }
    </div>
  );
});