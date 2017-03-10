import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router-dom';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      signUpSignInError: '',
      authenticated: localStorage.getItem('token')
    }
  }

  handleSignUp(credentials) {
    const { username, password, confirmPassword } = credentials;
    if(!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
      this.setState({
        signUpSignInError: 'Must Provide All Fields'
      });
    } else {
      axios.post('/api/signup', credentials)
        .then(resp => {
          const { token } = resp.data;
          localStorage.setItem('token', token);

          this.setState({
            signUpSignInError: '',
            authenticated: token
          });
        });
    }
  }

  handleSignIn(credentials) {
    // handle the signup yo
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
    });
  }

  renderSignUpSignIn() {
    return <SignUpSignIn error={this.state.signUpSignInError} onSignUp={this.handleSignUp.bind(this)} />
  }

  renderApp() {
    return (
      <div>
        <Match exact pattern="/" render={() => <h1>I am protected!</h1>} />
        <Match exact pattern="/secret" component={Secret} />
        <Miss render={() => <h1>NOT FOUND!</h1>} />
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar showNavItems={this.state.authenticated} onSignOut={this.handleSignOut.bind(this)} />
          {this.state.authenticated ? this.renderApp(): this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
