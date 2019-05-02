import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';
import NavigationBar from '../Navigation';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'; 
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: 'flex',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  footnote: {
    textAlign: 'center',
  }
});

// TODO: User information querying should be moved somewhere else
class AccountPageBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          userdata: {},
          value: 0,
        };
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    handleChangeIndex = index => {
      this.setState({ value: index });
    };

    componentDidMount() {
        this.setState({ loading: true });
        const { authUser } = this.context;
        this.props.firebase.user(authUser.uid).once('value', snapshot => {
          this.setState({
            userdata: snapshot.val(),
            loading: false,
          });
        });
    }

    componentWillUnmount() {
        const { authUser } = this.context;
        this.props.firebase.user(authUser.uid).off();
    }

    render() {
        const { classes, theme } = this.props; 
        const { loading, userdata } = this.state;

        const renderAccountDetails = (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Account Details
              </Typography>
            </Paper>
          </main>
        )

        const renderTab = (
          <main className={classes.main}>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Profile" />
                  <Tab label="Password" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                  {userInfo}
                </Typography>
                <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                  Reset Password
                </Typography>
              </SwipeableViews>
            </div>
          </main>
        )

        const userInfo = () => {
          console.log(loading, userdata)
          if (loading) {
            return (<div>Loading ...</div>)
          } else {
            return (
            <div>
              <ul>
                <li>
                  <span>
                    <strong>Username:</strong> {userdata.username}
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Email:</strong> {userdata.email}
                  </span>
                </li>
              </ul>
            </div>)
          }
        }

        return (
          <div>
              <NavigationBar />
              {/* {renderAccountDetails} */}
              {renderTab}
              <PasswordChangeForm />
          </div>
        );
    }
}

AccountPageBase.contextType = AuthUserContext;
AccountPageBase.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const condition = authUser => !!authUser;

const AccountPage = compose(
    withFirebase,
    withStyles(styles, { withTheme: true }),
    withAuthorization(condition),
)(AccountPageBase)

export default AccountPage;