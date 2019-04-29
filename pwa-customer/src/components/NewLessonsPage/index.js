import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavigationBar from '../Navigation';
import { withAuthorization } from '../Session';

const condition = authUser => !!authUser;

class NewLessons extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            WELCOME PAGE
                        </p>
                    </header>
                </div>
            </div>  
        );
    }
}

export default withAuthorization(condition)(NewLessons);