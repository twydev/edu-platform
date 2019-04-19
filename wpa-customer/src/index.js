import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import SearchAppBar from './components/SearchAppBar';

var hist = createBrowserHistory();

ReactDOM.render(<SearchAppBar />, document.getElementById('header'));
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
