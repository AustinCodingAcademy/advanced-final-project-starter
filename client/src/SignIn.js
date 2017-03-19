import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(prev => ({
      [name]: value
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSignIn({
      username: this.state.username,
      password: this.state.password
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel><h3>Sign in to enjoy Movie Memory</h3></ControlLabel>
          <FormControl
            type="text"
            name="username"
            placeholder="User Name"
            value={this.state.username}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <Button id="sign-in" type="submit">
         Sign In
        </Button>
      </form>
    )
  }
}

export default SignIn;
