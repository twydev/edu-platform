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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
  // root: {
  //   marginTop: theme.spacing.unit * 10,
  //   backgroundColor: theme.palette.background.paper,
  //   width: 500,
  // },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
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
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  footnote: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 4,
  },
  listview: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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


    profileList() {
      const { userdata } = this.state;
      const { classes } = this.props;
      return (
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Your Profile
          </Typography> 
        <List className={classes.listview}>
          <ListItem>
            <Avatar>
              <AccountCircle />
            </Avatar>
            <ListItemText primary="Username" secondary={userdata.username} />
          </ListItem>
          <ListItem>
            <Avatar>
              <MailIcon />
            </Avatar>
            <ListItemText primary="Email Address" secondary={userdata.email} />
          </ListItem>
        </List>
        </Paper>
      )
    }

    render() {
        const { classes, theme } = this.props; 
        const { loading, value } = this.state;

        const renderTab = (
          <main className={classes.main}>
            <CssBaseline />

              <AppBar position="static" color="default">
                <Tabs
                  value={value}
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
                  index={value}
                  onChangeIndex={this.handleChangeIndex}
                >
                {loading ?  <Typography component="div" style={{ padding: 8 * 3 }}>
                                              Loading...
                                            </Typography> 
                                         : this.profileList()}
                  <PasswordChangeForm />
                </SwipeableViews>
              
          </main>
        )

        return (
          <div>
              <NavigationBar />
              {renderTab}
          </div>
        );
    }
}


AccountPageBase.contextType = AuthUserContext;
AccountPageBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

const condition = authUser => !!authUser;

const AccountPage = compose(
    withFirebase,
    withStyles(styles, { withTheme: true}),
    withAuthorization(condition),
)(AccountPageBase)

export default AccountPage;