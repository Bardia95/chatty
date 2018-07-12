import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onMessageEnter = this.onMessageEnter.bind(this);
    this.onNameEnter = this.onNameEnter.bind(this);
  }
  onMessageEnter(e) {
    if (e.key === 'Enter') {
      const newMessage = {
        username: this.props.username,
        content: e.target.value
      };
      this.props.addMessage(newMessage);
      e.target.value = "";
    }
  }
  onNameEnter(e) {
    if (e.key === 'Enter') {
      this.props.changeUser(e.target.value);
      // e.target.value = this.props.username;
    }
  }
  onNameChange(e) {
    if (e.key != 'Enter') {
      // e.target.value = this.props.username;
    }
  }


  render() {
    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Type a name and hit ENTER" name="currentusername" onKeyPress={this.onNameEnter} onChange={this.onNameChange} defaultValue={this.props.username}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="currentmessage" onKeyPress={this.onMessageEnter}/>
    </footer>
  );
}
}
export default ChatBar;

