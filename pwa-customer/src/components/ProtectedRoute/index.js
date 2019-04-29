import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

/**
 * @deprecated Authorization module in Session component is protecting the route
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? 
                    <Component {...props} /> : 
                    <Redirect to={ROUTES.SIGN_IN}/>
            }
        </AuthUserContext.Consumer>
    )} />
)

export default ProtectedRoute;