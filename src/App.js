import React, { Component } from 'react';
import {PreChatPlate} from "./components/dumb/PreChatPlate/PreChatPlate";

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
      <PreChatPlate {...user1} />
    );
  }
}

export default App;
