import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList />
        <ChatBar/>
      </div>
    );
  }
}
export default App;
