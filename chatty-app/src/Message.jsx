import React, {Component} from 'react';



function Message(props) {
  const style = {color: props.userColor};
  if (props.type == 'notification') {
    return (
      <div className="notification">
        <span className="notification-content">{props.oldName} changed their name to {props.newName}.</span>
      </div>
    )
  } else if (props.type == 'message') {
    return (
        <div className="message">
          <span className="message-username" style={style}>{props.username}</span>
          <span className="message-content">{props.content}</span>
        </div>
      );
  }
}
export default Message;

