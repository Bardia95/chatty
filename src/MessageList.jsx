import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

function generateRandomString() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charsLength = chars.length;
    var a = [];
    for (var i = 0; i < 6; i++) {
      a.push( chars.charAt(Math.floor(Math.random() * charsLength)) );
    }
    return a.join('');
  }

function MessageList(props) {
  const messageList = props.messages.map(message => {
    return <Message key={generateRandomString()} username={message.username} content={message.content} />;
  });
  return (
    <main className="messages">
      {messageList}
    </main>

  );
}
export default MessageList;
