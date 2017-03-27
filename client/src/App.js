import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import GameApp from './GameApp';
import MemoryHelp from './MemoryHelp';
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
    // handle the signin yo
    const { username, password } = credentials;
    if(!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: 'Must provide all fields!'
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
    return <SignUpSignIn error={this.state.signUpSignInError}
              onSignUp={this.handleSignUp.bind(this)}
              onSignIn={this.handleSignIn.bind(this)} />
  }

  renderApp() {
    return (
      <div>
        <Switch>
          <Route exact path="/mygames" component={GameApp} />
          <Route exact path="/help" component={MemoryHelp} />
          <Route exact pattern="/" render={() => <h1>You should totes sign up to play!</h1>} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar showNavItems={this.state.authenticated ? true : false} onSignOut={this.handleSignOut.bind(this)} />
          {this.state.authenticated ? this.renderApp(): this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
