import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class InboxPage extends Component {

  render() {
    const specialBG = {
      background: '#0c5959',
    };

    return (
      <div className="App">
        <header className="App-header" style={specialBG}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            INBOX PAGE WORK IN PROGRESS.
          </p>
        </header>
      </div>
    );
  }
}

export default InboxPage;