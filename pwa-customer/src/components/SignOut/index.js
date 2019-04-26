import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import PowerIcon from '@material-ui/icons/PowerSettingsNew';

class SignOutFunction extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    signOut() {
        this.props.firebase.doSignOut();
        this.props.history.push(ROUTES.SIGN_IN);
    }
    render() {
        return (
                <PowerIcon color='error' />
        );
    }
}

const SignOutButton = compose(
    withRouter,
    withFirebase,
)(SignOutFunction)

export default SignOutButton;