import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpSignInError: '',
      authenicated: localStorage.getItem('token') || false
    };
  }

  handleSignUp(credentials) {
    const { username, password, confirmPassword } = credentials;

    if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
      this.setState({
        signUpSignInError: 'Must provide all fields'
      });
    } else {
      axios.post('/api/signup', credentials)
        .then(resp => {
          const { token } = resp.data;
          // palces token
          localStorage.setItem('token', token);

          this.setState({
            signUpSignInError: '',
            authenicated: token
          });
        });
    }
  }

  handleSignIn() {
  /* const { username, password } = credentials;

    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: 'Must provide all fields'
      });
    } else {
      axios.get('/api/signin', credentials)
        .then(resp => {
          const { token } = resp.data;
          // places token
          localStorage.setItem('token', token);

          this.setState({
            signUpSignInError: '',
            authenicated: token
          });
        });
    } */
  }

  handleSignOut() {
    // removes token
    localStorage.removeItem('token');

    this.setState({
      authenicated: false
    });
  }

  renderSignUpSignIn() {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp.bind(this)}
      />
    );
  }

  renderApp() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <h1>I am protected!</h1>} />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar
            showNavItems={this.state.authenicated}
            onSignOut={this.handleSignOut.bind(this)}
          />
          {this.state.authenicated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
