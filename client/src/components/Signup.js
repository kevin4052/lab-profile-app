import React, { Component } from 'react';
import AuthService from './AuthServices';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            campus: "",
            course: ""
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
            .signup(this.state)
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
                <h3>Signup page</h3>
                <div>
                    <label>username: 
                        <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                    </label>

                    <label>password: 
                        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    </label>

                    <label>campus: 
                        <input type='text' name='campus' list='campus-list' value={this.state.campus} onChange={this.handleChange}/>
                        <datalist id='campus-list'>
                            <option value='Madrid'/>
                            <option value='Barcelona'/>
                            <option value='Miami'/>
                            <option value='Paris'/>
                            <option value='Berlin'/>
                            <option value='Amsterdam'/>
                            <option value='Mexico'/>
                            <option value='Sao Paulo'/>
                            <option value='Lisbon'/>
                        </datalist>
                    </label>

                    <label>course: 
                        <input type='text' name='course' list='course-list' value={this.state.course} onChange={this.handleChange}/>
                        <datalist id='course-list'>
                            <option value='Web Dev'/>
                            <option value='UX/UI'/>
                            <option value='Data Analytics'/>
                        </datalist>
                    </label>
                    <button onClick={this.handleSubmit}>Signup</button>
                </div>
            </div>
        )
    }
}
