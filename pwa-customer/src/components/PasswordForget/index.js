import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


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

const PasswordForgetPage = () => (
    <div>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
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
        const { email, error } = this.state;
        const { classes } = this.props;

        const isInvalid = email === '';

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Forgot Password?
                  </Typography>
                  <form className={classes.form} onSubmit={this.onSubmit}>

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Enter your email address</InputLabel>
                      <Input 
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        autoComplete="email"
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
          </main>
        );
    }
}

// const PasswordForgetLink = () => (
//         <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
// );

const PasswordForgetLink = compose(
    withStyles(styles),
)((props) => {
    const { classes } = props;
    return (
        <div className={classes.main}>
            <p className={classes.footnote}>
                <small><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link></small>
            </p>
        </div>
    );
})

export default PasswordForgetPage;

const PasswordForgetForm = compose(
  withFirebase,
  withStyles(styles),
)(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink };