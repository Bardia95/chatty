import React, {Component} from 'react';


class Notification extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.oldName} changed their name to {this.props.newName}.
      </div>
    );
  }
}

export default Notification;
