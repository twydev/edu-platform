import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
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
    textAlign:  'center',
  }
});

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Platform.edu account
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Full Name</InputLabel>
              <Input 
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                autoComplete="name"
                autoFocus 
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                autoComplete="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordOne">Password</InputLabel>
              <Input 
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
              <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
              />
            </FormControl>
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </Paper>
      </main>
    );
  }
}

SignUpFormBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const SignUpLink = () => (
//     <div>
//       <p>
//         Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link> now {param.main}.
//       </p>
//     </div>
// );

const SignUpLink = compose(
  withStyles(styles),
)((props) => {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <p className={classes.footnote}>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link> now.
      </p>
    </div>
  );
})

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles),
)(SignUpFormBase)

export default SignUpPage;

export { SignUpForm, SignUpLink };