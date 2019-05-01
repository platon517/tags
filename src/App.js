import React  from 'react';
import {PreChatPlate} from "./components/dumb/PreChatPlate/PreChatPlate";
import {NoConnection} from "./components/dumb/NoConnection/NoConnection";
import {ChatContainer} from "./components/dumb/ChatContainer/ChatContainer";
import {DynamicHeightContainer} from "./components/UI/DynamicHeightContainer/DynamicHeightContainer";
import {TagsEditor} from "./components/dumb/TagsEditor/TagsEditor";
import {WINDOWS} from "./constants/constants";
import io from 'socket.io-client'
import endcrypt from 'endcrypt';

import man from '../src/img/svg/man.svg';
import man_1 from '../src/img/svg/man-1.svg';
import man_2 from '../src/img/svg/man-2.svg';
import man_3 from '../src/img/svg/man-3.svg';
import man_4 from '../src/img/svg/man-4.svg';
import girl from '../src/img/svg/girl.svg';
import girl_1 from '../src/img/svg/girl-1.svg';
import boy from '../src/img/svg/boy.svg';
import boy_1 from '../src/img/svg/boy-1.svg';

export const UserContext = React.createContext({});

export const FoundUserContext = React.createContext({});

export const WindowContext = React.createContext('');

export const SocketContext = React.createContext(null);

export const AvatarsContext = React.createContext(null);

export const CryptContext = React.createContext(null);

const avatars = [man, man_1, man_2, man_3, man_4, girl, girl_1, boy, boy_1];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const App = () => {

  const [windowPlate, setWindowPlate] = React.useState('');
  const [noConnection, setNoConnection] = React.useState(true);

  const [user, setUser] = React.useState({
    id: null,
    name: null,
    avatar: null,
    tags: []
  });

  const [foundUser, setFoundUser] = React.useState(null);

  const [socket, setSocket] = React.useState(null);

  const [crypt, setCrypt] = React.useState(null);

  React.useEffect(() => {
    setWindowPlate(WINDOWS.TAGS_EDITOR);
    const avatarId = getRandomInt(0, avatars.length);
    const newSocket = io.connect(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL : process.env.REACT_APP_API
    );
    if (newSocket) {
      setSocket(newSocket);
      newSocket.on('connect_error', () => {
        setNoConnection(true);
        setUser({
          ...user,
          name: 'Your Name',
          avatar: avatarId
        });
      });
      newSocket.on('connect', () => {
        windowPlate !== WINDOWS.TAGS_EDITOR && setWindowPlate(WINDOWS.TAGS_EDITOR);
        setNoConnection(false);
        setFoundUser(null);
        setUser({
          ...user,
          id: newSocket.id,
          name: `User ${newSocket.id.substr(0, 5)}`,
          avatar: avatarId
        });
        newSocket.on('noUsers', () => {
          setWindowPlate(WINDOWS.TAGS_EDITOR);
          alert('No users found.');
        });
        newSocket.on('userFound', res => {
          const user = res.user;
          setFoundUser({
            id: user.id,
            name: user.name,
            tags: user.tags,
            avatar: user.avatar,
          });
          setCrypt(new endcrypt.Endcrypt());
        });
        newSocket.on('endChat', event => {
          //event.log !== 'null' && alert(event.log);
          event.findNext ? setWindowPlate(WINDOWS.PRE_CHAT) : setWindowPlate(WINDOWS.TAGS_EDITOR);
          setFoundUser(null);
          setCrypt(null);
          newSocket.removeAllListeners('partnerIsReady');
        });
      });
    }
  }, []);

  const updateTags = newTags => {
    setUser({
      ...user,
      tags: newTags
    });
  };

  const updateName = newName => {
    setUser({
      ...user,
      name: newName
    })
  };

  const updateAvatar = newAvatar => {
    setUser({
      ...user,
      avatar: newAvatar
    })
  };

  const renderSwitcher = () => {
    //foundUser && alert(`foundUser: ${foundUser.id}`);
    //contextFoundUser.self && alert(`context: ${contextFoundUser.self.id}`);
    switch (windowPlate) {
      case WINDOWS.PRE_CHAT :
        return (
          <FoundUserContext.Provider value={contextFoundUser}>
            <PreChatPlate/>
          </FoundUserContext.Provider>
        );
      case WINDOWS.CHAT :
        return (
          <FoundUserContext.Provider value={contextFoundUser}>
            <ChatContainer/>
          </FoundUserContext.Provider>
        );
      case WINDOWS.TAGS_EDITOR :
        return (
          <TagsEditor/>
        );
      default:
        return (
          <TagsEditor/>
        );
    }
  };

  const contextUser = {
    self: user,
    updateName: updateName,
    updateTags: updateTags,
    updateAvatar: updateAvatar
  };

  const contextFoundUser = {
    self: foundUser,
    set: setFoundUser
  };

  const contextWindow = {
    self: windowPlate,
    setWindowPlate: setWindowPlate
  };

  return (
    <SocketContext.Provider value={socket}>
      <UserContext.Provider value={contextUser}>
        <CryptContext.Provider value={crypt}>
          <WindowContext.Provider value={ contextWindow }>
            <DynamicHeightContainer>
              <AvatarsContext.Provider value={avatars}>
                {noConnection && <NoConnection/>}
                {
                  renderSwitcher()
                }
              </AvatarsContext.Provider>
            </DynamicHeightContainer>
          </WindowContext.Provider>
        </CryptContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
