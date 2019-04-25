import React, { Component } from 'react';

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import InboxPage from '../InboxPage';
import NewLessons from '../NewLessonsPage';
import SignUpPage from '../SignUp';
import NotFound from '../../404';
import Firebase, { FirebaseContext } from '../Firebase';

class App extends Component {

    render() {

        return (
            //<Router history={hist}>
            <FirebaseContext.Provider value={new Firebase()}>
                <Router>
                    <Switch>
                        <Route exact path={ROUTES.LANDING} component={NewLessons} />
                        <Route path={ROUTES.INBOX} component={InboxPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        {/* <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </FirebaseContext.Provider>
        );
    }
}

export default App;