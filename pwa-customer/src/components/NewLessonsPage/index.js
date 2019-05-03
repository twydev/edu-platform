import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import NavigationBar from '../Navigation';
import { AuthUserContext, withAuthorization } from '../Session';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    main: {
        marginTop: theme.spacing.unit * 8,
    },
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

const condition = authUser => !!authUser;

class NewLessonsBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data: [],
          error: null,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        const { idToken } = this.context;
        
        this.getData('https://platform-edu.appspot.com/api/v1/lesson/', idToken);
    }

    componentWillUnmount() {
    }

    getData(url, idToken) {
        return fetch(url, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "jwt " + idToken,
        },
        // mode: 'no-cors',
        })
        .then(response => response.json())
        .then(response => {
            if (response.hasOwnProperty('detail')) {
                this.setState({
                    error: response.detail,
                    loading: false,
                })
            } else {
                this.setState({
                    data: response,
                    loading: false,
                })
            }
        })
        .catch(error => {
            this.setState({
                error: error.message,
                loading: false,
            })
        })  
    }

    renderName() {
        const { data } = this.state
        if (data.length > 0) {
            return <p>{this.state.data[0].lesson_name}</p>
        }
    }

    render() {
        const { classes } = this.props;
        // const { loading, data, error } = this.state
        const { data, error } = this.state


        return (
            <React.Fragment>
                <CssBaseline />
                <NavigationBar />
                <main className={classes.main}>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <Grid container spacing={40}>
                            {data.map((lesson,index) => (
                                <Grid item key={index} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {lesson.lesson_code}
                                            </Typography>
                                            <Typography>
                                                {lesson.lesson_name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" color="textSecondary" component="p">
                        { error && <p>{error}</p> }
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Contact the outlets directly for more information.
                    </Typography>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );

    }

    // render() {
    //     const { loading, data, error } = this.state

    //     return (
    //         <div>
    //             <NavigationBar />
    //             <div className="App">
    //                 <header className="App-header">
    //                     <img src={logo} className="App-logo" alt="logo" />
    //                     { loading ? <p>loading...</p> : this.renderName()}
    //                     { error && <p>{error}</p> }
    //                 </header>
    //             </div>
    //         </div>  
    //     );
    // }
}

NewLessonsBase.contextType = AuthUserContext;
NewLessonsBase.propTypes = {
    classes: PropTypes.object.isRequired,
};

const NewLessons = compose(
    withStyles(styles),
    withAuthorization(condition),
)(NewLessonsBase)

export default NewLessons;