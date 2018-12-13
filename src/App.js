import React, { Component } from 'react';
import {PreChatPlate} from "./components/dumb/PreChatPlate/PreChatPlate";
import {ChatContainer} from "./components/dumb/ChatContainer/ChatContainer";
import {DynamicHeightContainer} from "./components/dumb/DynamicHeightContainer/DynamicHeightContainer";

class App extends Component {
  render() {
    const user1 = {
      name: 'Пророк Санбой',
      gander: 'male',
      tags: [
        {name: 'art'},
        {name: 'tabletops'},
        {name: 'netflix'},
        {name: 'games'},
        {name: 'nintendo'},
      ]
    };

    return (
      <DynamicHeightContainer>
        {
          //<PreChatPlate {...user1} />
          <ChatContainer/>
        }
      </DynamicHeightContainer>
    );
  }
}

export default App;
