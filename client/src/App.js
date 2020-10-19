import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/AuthServices';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }

    this.service = new AuthService();
  }

  componentDidMount = () => {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    this.service
      .currentUser()
      .then((currentUser) => {
        console.log({ currentUser });
        this.setState({ currentUser })
      })
      .catch((err) => {
        console.log({ err });
        this.setState({ currentUser: null });
      })
  }

  render() {
    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} />
        <Switch >
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signup' render={(props) => <Signup {...props} getCurrentUser={this.getCurrentUser}/>} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
