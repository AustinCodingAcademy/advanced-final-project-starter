import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';


class App extends Component {
  constructor() {
    super();

    this.state = {
      signUpSignInError: '',
      authenticated: localStorage.getItem('token')
    };
  }


  handleSignUp(credentials) {
    // Handler is responsible for taking the credentials, verifying the information
    // and submitting the request to the API to signup a new user.
    const { username, password, confirmPassword } = credentials;
    if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
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
    // Handler is responsible for taking the credentials, verifying the information
    // and submitting the request to the API to signin an existing user.
    const { username, password } = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: 'Must Provide All Fields'
      });
    } else {
      axios.post('/api/signin', credentials)
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


  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
    });
  }


  renderSignUpSignIn() {
    return <SignUpSignIn
      error={this.state.signUpSignInError}
      onSignUp={this.handleSignUp.bind(this)}
      onSignIn={this.handleSignIn.bind(this)}
      />;
  }


  renderApp() {
    // Returning routing logic to be rendered
    // When user successfully signsup / signsin, the token is updated in state,
    // which causes a re-render and then the renderApp method is called,
    // which allows the user access to the application.
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


  // Looking into state for authenticated value to be set, if so render App.
  // If state does not have authenticated value, render SignUpSignIn.
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar
            showNavItems={this.state.authenticated}
            onSignOut={this.handleSignOut.bind(this)}
          />
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
