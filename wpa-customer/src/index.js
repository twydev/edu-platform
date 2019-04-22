import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import './index.css';
import App from './App';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import InboxPage from './components/InboxPage';
import NotFound from './notfound';

// var hist = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
});

ReactDOM.render(
  //<Router history={hist}>
  <Router>
    <div>
      <MuiThemeProvider theme={theme}>
        <PrimarySearchAppBar />
      </MuiThemeProvider>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/inbox" component={InboxPage} />
        <Route component={NotFound} />
    </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
