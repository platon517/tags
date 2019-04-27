import React from 'react';
import Peer from 'simple-peer';
import {FoundUserContext, SocketContext, UserContext} from "../../../App";
import styles from './VideoChat.module.scss';

export const VideoChat = React.memo(props => {

  const socket = React.useContext(SocketContext);
  const contextFoundUser = React.useContext(FoundUserContext);
  const foundUser = contextFoundUser.self;
  const contextUser = React.useContext(UserContext);
  const user = contextUser.self;

  const [peer, setPeer] = React.useState(null);
  const [videoSrc, setVideoSrc] = React.useState(null);

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(gotMedia);
    return () => {
      peer && peer.destroy();
      setPeer(null);
      socket.removeAllListeners('getVideoResponse');
      console.log('test');
    }
  }, []);

  React.useEffect(() => {
    if (peer) {
      peer.on('error', err => console.log('error', err) );

      peer.on('signal', data => {
        console.log('SIGNAL', JSON.stringify(data));
        socket.emit('sendVideoResponse', {
          pair: foundUser,
          token: JSON.stringify(data)
        });
      });

      socket.on('getVideoResponse', handleVideoResponse);

      peer.on('connect', () => {
        console.log('CONNECT');
      });

      peer.on('data', data => {
        console.log('data: ' + data)
      });

      peer.on('stream', stream => {
        // got remote video stream, now let's show it in a video tag
        setVideoSrc(window.URL.createObjectURL(stream));
      })

    }
  }, [peer]);

  const gotMedia = stream => {
    console.log('test');
    setPeer(new Peer({ initiator: user.id > foundUser.id, stream: stream, trickle: false }));
  };

  const handleVideoResponse = data => {
    peer.signal(JSON.parse(data))
  };

  return(
    <div className={styles.container}>
      <video src={videoSrc} autoPlay={true}/>
      <div className={styles.controls}>
        <button onClick={props.endVideoCall} className={styles.endCallButton}>End call</button>
      </div>
    </div>
  )
});