import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
  }
  onEnter(e) {
    if (e.key === 'Enter') {
      const newMessage = {
        username: this.props.username,
        content: e.target.value
      };
      this.props.addMessage(newMessage);
      e.target.value = "";
    }
  }
  render() {
    return (
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.username} name="currentusername"/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="currentmessage" onKeyPress={this.onEnter}/>
    </footer>
  );
}
}
export default ChatBar;

