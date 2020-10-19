import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthServices';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        console.log({props: this.props})
    }

    logout = () => {
        this.service
            .logout()
            .then(() => {
                this.props.history.push('/');
            })
            .catch((err) => console.log({ err }));
    }

    displayUserOptions = () => {
        return this.props.currentUser ? (
            <div>
                <img
                    src={`${this.props.currentUser.profileImage}`}
                    alt="profile icon"
                />
                <h4>Hello {this.props.currentUser.username}</h4>
                <button onClick={this.logout}>Logout</button>
            </div>
        ) : (
            <div>
                <Link to="/signup">Sign Up</Link>
                <Link to="login">Log In</Link>
            </div>
        );
    }

    render() {
        return (
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    {this.props.currentUser ? (
                        <div>
                            <img
                                src={`${this.props.currentUser.profileImage}`}
                                alt="profile icon"
                            />
                            <h4>Hello {this.props.currentUser.username}</h4>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="login">Log In</Link>
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}
