import React, {Component} from 'react';
import Message from "./Message.jsx";

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
    const userColor = props.clients[message.data.userId].color;
    return <Message key={generateRandomString()} userColor={userColor} type= {message.type} oldName= {message.data.oldName} newName = {message.data.currentUser} username={message.data.username} content={message.data.content} />;
  });
  return (
    <main className="messages">
      {messageList}
    </main>

  );
}
export default MessageList;
