import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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

const PasswordChangePage = () => (
    <div>
        <PasswordChangeForm />
    </div>
);

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.footnote}>
                Password Reset
            </Typography> 
          <form className={classes.form} onSubmit={this.onSubmit}> 
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordOne">New Password</InputLabel>
              <Input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordTwo">Confirm New Password</InputLabel>
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
              Reset My Password
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </Paper>
        );
    }
}

const PasswordChangeForm = compose(
  withFirebase,
  withStyles(styles),
)(PasswordChangeFormBase)

export default PasswordChangeForm;