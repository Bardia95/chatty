import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob', oldName: ''},
      messages: [],
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  addMessage(message) {
    const msg = {
      type: "message",
      content: message.content,
      username: message.username
    };
    this.socket.send(JSON.stringify(msg));
  }

  changeUser(username) {
    const notification = {
      type: "notification",
      oldName: this.state.currentUser.name,
      currentUser: username
    }
    console.log("changeUser notification", notification);
    this.socket.send(JSON.stringify(notification));
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      console.log("componentDidMount msg", msg)
      switch (msg.type) {
        case "message":
          const newMessage = msg.data
          this.setState({
            messages: this.state.messages.concat(msg.data)
          });
          break;
        case "notification":
          const newNotification = msg.data
          console.log("newNotification", newNotification)
          this.setState({
             currentUser: {
              name: newNotification.currentUser,
              oldName: newNotification.oldName
            }
           })
          console.log("componentDidMount notification state", this.state)
          break

        default:
      };
    };
  }



  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages ={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name}  addMessage={this.addMessage} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
