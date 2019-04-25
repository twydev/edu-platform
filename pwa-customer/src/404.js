import React from 'react';
import './components/App/App.css';

import NavigationBar from './components/Navigation';

const NotFound = () =>  {
    return (
        <div>
            <NavigationBar />
            <div className="App">
                <header className="App-header">
                    <h1>404</h1>
                    <p>
                        Your Page is Missing.
                    </p>
                </header>
            </div>
        </div>
    );
};

export default NotFound