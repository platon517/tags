import React  from 'react';
import {PreChatPlate} from "./components/dumb/PreChatPlate/PreChatPlate";
import {ChatContainer} from "./components/dumb/ChatContainer/ChatContainer";
import {DynamicHeightContainer} from "./components/UI/DynamicHeightContainer/DynamicHeightContainer";
import {TagsEditor} from "./components/dumb/TagsEditor/TagsEditor";
import {WINDOWS} from "./constants/constants";
import io from 'socket.io-client'
import {Test} from "./components/dumb/Test";

export const UserContext = React.createContext({});

export const FoundUserContext = React.createContext({});

export const WindowContext = React.createContext('');

export const SocketContext = React.createContext(null);

const App = () => {

  const [window, setWindow] = React.useState('');

  const [user, setUser] = React.useState({
    id: null,
    name: null,
    avatar: '',
    tags: []
  });

  const [foundUser, setFoundUser] = React.useState(null);

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setWindow(WINDOWS.TAGS_EDITOR);
    setSocket(io.connect(process.env.REACT_APP_API));
  }, []);

  if (socket && socket._callbacks['connect'] === undefined) {
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id,
        name: `User ${socket.id.substr(0, 5)}`
      });
      socket.on('noUsers', () => {
        setWindow(WINDOWS.TAGS_EDITOR);
        alert('No users found.');
      });
      socket.on('userFound', res => {
        const user = res.user;
        setFoundUser({
          id: user.id,
          name: user.name,
          tags: user.tags,
          avatar: '',
        });
      });
      socket.on('endChat', event => {
        event.msg !== 'null' && alert(event.msg);
        setWindow(WINDOWS.TAGS_EDITOR);
        setFoundUser(null);
      });
    });
  }

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

  const renderSwitcher = () => {
    switch (window) {
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
        return <TagsEditor/>;
      default:
        return <TagsEditor/>
    }
  };

  const contextUser = {
    self: user,
    updateName: updateName,
    updateTags: updateTags
  };

  const contextFoundUser = {
    self: foundUser,
    set: setFoundUser
  };

  const contextWindow = {
    self: window,
    setWindow: setWindow
  };

  return (
    <SocketContext.Provider value={socket}>
      <UserContext.Provider value={contextUser}>
        <WindowContext.Provider value={ contextWindow }>
          <DynamicHeightContainer>
            {
              renderSwitcher()
            }
          </DynamicHeightContainer>
        </WindowContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
