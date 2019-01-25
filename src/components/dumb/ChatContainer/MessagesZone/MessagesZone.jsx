import React from 'react';
import styles from './MessagesZone.module.scss';
import {MessageContainer} from "../MessageContainer/MessageContainer";
import {UserContext} from "../../../../App";

const combineMessagesById = messages => {
  const messagesById = [];

  messages.reduce( (nowId, mes) => {
    if (nowId !== mes.senderId) {
      messagesById.push({
        id: messagesById.length,
        senderId: mes.senderId,
        messages: []
      })
    }
    messagesById[messagesById.length - 1].messages.push(mes);
    return mes.senderId;
  }, null);

  return messagesById;
};

export const MessagesZone = React.memo(props => {

  const contextUser = React.useContext(UserContext);

  const user = contextUser.self;

  const wrapper = React.useRef();

  const rubberScrollFix = () => {
    (() => {
      const _overlay = wrapper.current;
      let _clientY = null; // remember Y position on touch start

      _overlay.addEventListener('touchstart', function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          _clientY = event.targetTouches[0].clientY;
        }
      }, false);

      _overlay.addEventListener('touchmove', function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          disableRubberBand(event);
        }
      }, false);

      function disableRubberBand(event) {
        let clientY = event.targetTouches[0].clientY - _clientY;

        if (_overlay.scrollTop === 0 && clientY > 0) {
          // element is at the top of its scroll
          event.preventDefault();
        }

        if (isOverlayTotallyScrolled() && clientY < 0) {
          //element is at the top of its scroll
          event.preventDefault();
        }
      }

      function isOverlayTotallyScrolled() {
        return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
      }
    })();
  };

  React.useEffect(() => {
    wrapper.current.scrollTop = wrapper.current.scrollHeight;
    rubberScrollFix();
  }, [props.messages]);

  const { messages } = props;

  const myId = user.id;

  return (
    <div ref={wrapper} className={styles.scrollWrapper}>
      <div className={styles.zone}>
        {
          combineMessagesById(messages).map(
            item =>
              <MessageContainer
                key={ item.id }
                yours={ item.senderId === myId }
                messages={ item.messages }
              />
          )
        }
      </div>
    </div>
  );
});