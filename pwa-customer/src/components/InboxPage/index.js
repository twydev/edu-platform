import React, { Component } from 'react';
import '../App/App.css';

import NavigationBar from '../Navigation';
import { withAuthorization } from '../Session';

const condition = authUser => !!authUser;

class InboxPage extends Component {

  render() {
    const specialBG = {
      background: '#0c5959',
    };

    return (
      <div>
        <NavigationBar />
        <div className="App">
          <header className="App-header" style={specialBG}>
            <h1>INBOX</h1>
            <p>
              INBOX PAGE WORK IN PROGRESS.
            </p>
          </header>
        </div>
      </div>
    );
  }
}

export default withAuthorization(condition)(InboxPage);