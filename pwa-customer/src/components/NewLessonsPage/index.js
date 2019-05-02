import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavigationBar from '../Navigation';
import { AuthUserContext, withAuthorization } from '../Session';

const condition = authUser => !!authUser;

const INITIAL_STATE = {
    lesson_name: '',
    lesson_code: '',
    pub_date: '',
};

class NewLessons extends Component {
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
        const { authUser } = this.context;
        this.getData('http://localhost:8000/api/v1/lesson/');
    }

    componentWillUnmount() {
    }

    getData(url) {
        return fetch(url, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // mode: 'no-cors',
        // Authorization: "Bearer " + AuthStr,
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                data: response,
                loading: false,
            })
        })
        .catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })  
        // .then(
        //     (result) => {
        //         this.setState({
        //             loading: false,
        //             data: result,
        //         });
        //         console.log(result);
        //     },
        //     (error) => {
        //         this.setState({
        //             loading: false,
        //             error: error,
        //         });
        //         console.log(error);
        //     }
        // )
    }

    renderName() {
        const { data } = this.state
        if (data.length > 0) {
            return <p>{this.state.data[0].lesson_name}</p>
        }
    }

    render() {
        const { loading, data, error } = this.state

        return (
            <div>
                <NavigationBar />
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        { loading ? <p>loading...</p> : this.renderName()}
                        { error && <p>{error.message}</p> }
                    </header>
                </div>
            </div>  
        );
    }
}

NewLessons.contextType = AuthUserContext;

export default withAuthorization(condition)(NewLessons);