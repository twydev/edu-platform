import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import InboxPage from '../InboxPage';
import LandingPage from '../Landing';
import NewLesson from '../NewLessonsPage';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetForm from '../PasswordForget';
import AccountPage from '../Account';
import NotFound from '../../404';
// import ProtectedRoute from '../ProtectedRoute';

// import Firebase, { FirebaseContext, withFirebase } from '../Firebase';
import { withAuthentication } from '../Session';

const theme = createMuiTheme({
    palette: {
        primary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    //<Router history={hist}>
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route exact path={ROUTES.INBOX} component={InboxPage} />
                    <Route exact path={ROUTES.HOME} component={NewLesson} />
                    <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetForm} />
                    <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
                    {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
                    <Route component={NotFound} />
                </Switch>
            </Router>
            </MuiThemeProvider>
        );
    }
}

export default withAuthentication(App);