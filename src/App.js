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
    const newSocket = io.connect(process.env.REACT_APP_API);
    if (newSocket) {
      newSocket.on('connect', () => {
        setUser({
          ...user,
          id: newSocket.id,
          name: `User ${newSocket.id.substr(0, 5)}`
        });
        newSocket.on('noUsers', () => {
          setWindow(WINDOWS.TAGS_EDITOR);
          alert('No users found.');
        });
        newSocket.on('userFound', res => {
          const user = res.user;
          console.log(user);
          setFoundUser({
            id: user.id,
            name: user.name,
            tags: user.tags,
            avatar: '',
          });
        });
        newSocket.on('endChat', event => {
          //event.log !== 'null' && alert(event.log);
          !event.findNext && setWindow(WINDOWS.TAGS_EDITOR);
          setFoundUser(null);
        });
      });
    }
    setSocket(newSocket);
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
