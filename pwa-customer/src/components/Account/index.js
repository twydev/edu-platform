import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

// const MainContent = () => (
//     <main className={classes.content}>
//           <div className={classes.appBarSpacer} />
//           <Typography variant="h4" gutterBottom component="h2">
//             Orders
//           </Typography>
//           <Typography component="div" className={classes.chartContainer}>
//             <SimpleLineChart />
//           </Typography>
//           <Typography variant="h4" gutterBottom component="h2">
//             Products
//           </Typography>
//           <div className={classes.tableContainer}>
//             <SimpleTable />
//           </div>
//     </main>
// )

// TODO: User information querying should be moved somewhere else
class AccountPageBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          userdata: {},
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).once('value', snapshot => {
          this.setState({
            userdata: snapshot.val(),
            loading: false,
          });
        });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).off();
    }

    render() {
        const { loading, userdata } = this.state;
        return (
             <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading ? <div>Loading ...</div> : <UserInfo userdata={userdata}/>}
                        <PasswordChangeForm />
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const UserInfo = ({userdata}) => (
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
);

const condition = authUser => !!authUser;

const AccountPage = compose(
    withFirebase,
    withAuthorization(condition),
)(AccountPageBase)

export default AccountPage;