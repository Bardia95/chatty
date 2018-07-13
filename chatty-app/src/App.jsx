import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous', oldName: ''},
      messages: [],
      id: '',
      myself: {
        id: '',
        color: '',
      },
      clients: {}
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  addMessage(message) {
    const msg = {
      type: "message",
      content: message.content,
      username: message.username,
      userId: this.state.id
    };
    this.socket.send(JSON.stringify(msg));
  }

  changeUser(username) {
    const notification = {
      type: "notification",
      oldName: this.state.currentUser.name,
      currentUser: username
    }
    this.setState({
      currentUser: {
        name: username,
        oldName: this.state.currentUser.name,
      }
    })
    this.socket.send(JSON.stringify(notification));
  }



  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = e => {
      let newState = Object.assign({}, this.state)
      const msg = JSON.parse(e.data);
      switch (msg.type) {
        case 'disconnection':
          delete newState.clients[msg.data.id]
          this.setState(newState);
        break
          break;
        case 'setup':
          const clients = msg.data.connectedClients;
          const myself = clients[msg.data.id];
          this.setState({
            clients: clients,
            myself: myself,
            id: myself.id,
            color: myself.color,
          })
        break
        case "connection":
          if (msg.data.id !== this.state.id) {
            newState.clients[msg.data.id] = msg.data;
            this.setState(newState);
          }
          break;
        case "message":
          this.setState({
            messages: this.state.messages.concat(msg)
          });
          break;
        case "notification":
          const newNotification = msg.data;
          this.setState({
            messages: this.state.messages.concat(msg)
           })
          break;
        default:
      };
    };
  }



  render() {
    return (
      <div className="container">
        <NavBar clients={this.state.clients}/>
        <MessageList messages={this.state.messages} clients={this.state.clients} />
        <ChatBar username={this.state.currentUser.name}  addMessage={this.addMessage} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
