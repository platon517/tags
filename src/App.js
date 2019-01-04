import React  from 'react';
import {PreChatPlate} from "./components/dumb/PreChatPlate/PreChatPlate";
import {ChatContainer} from "./components/dumb/ChatContainer/ChatContainer";
import {DynamicHeightContainer} from "./components/UI/DynamicHeightContainer/DynamicHeightContainer";
import {TagsEditor} from "./components/dumb/TagsEditor/TagsEditor";
import {WINDOWS} from "./constants/constants";

export const UserContext = React.createContext({});

export const FoundUserContext = React.createContext({});

export const WindowContext = React.createContext('');

const App = () => {

  const [window, setWindow] = React.useState('');

  const [user, setUser] = React.useState({});

  const [foundUser, setFoundUser] = React.useState(null);

  React.useEffect(() => {
    setWindow(WINDOWS.TAGS_EDITOR);
    setUser({
      name: 'Пророк Санбой',
      avatar: '',
      tags: [
        {name: 'art'},
        {name: 'tabletops'},
        {name: 'netflix'},
        {name: 'games'},
        {name: 'nintendo'},
      ]
    });
    setFoundUser({
      name: 'Marie Curie',
      avatar: '',
      tags: [
        {name: 'science'},
        {name: 'chemistry'},
        {name: 'death'},
      ]
    });
  }, []);

  const updateTags = newTags => {
    setUser({
      ...user,
      tags: newTags
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
    <UserContext.Provider value={contextUser}>
      <WindowContext.Provider value={ contextWindow }>
        <DynamicHeightContainer>
          {
            renderSwitcher()
          }
        </DynamicHeightContainer>
      </WindowContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
