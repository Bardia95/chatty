import React, {Component} from 'react';

function NavBar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p> Users Online: {Object.keys(props.clients).length} </p>
    </nav>
  );
}
export default NavBar;


