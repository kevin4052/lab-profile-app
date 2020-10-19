import React, { Component } from 'react';
import AuthService from './AuthServices';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.service = new AuthService();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        this.service
            .login(this.state)
            .then((response) => {
                if (response.message) {
                    this.setState({ message: response.message });
                } else {
                    this.props.getCurrentUser();
                    this.props.history.push("/");
                }
            })
            .catch((err) => console.log({ err }));
    }
    render() {
        return (
            <div>
                <h3>Login page</h3>
                <div>
                    <label>username: 
                        <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                    </label>

                    <label>password: 
                        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <button onClick={this.handleSubmit}>Log In</button>
                </div>
            </div>
        )
    }
}

