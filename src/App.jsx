import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
    };
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(message) {
    const msg = {
      type: "message",
      content: message.content,
      username: message.username
    };
    console.log(msg);
    this.socket.send(JSON.stringify(msg));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = event => {

    };
    this.socket.onmessage = event => {
      console.log(event.data);
    };
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages ={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name}  addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
