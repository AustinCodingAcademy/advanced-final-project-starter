import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }


  handleSubmit(event) {
    // handleSubmit method is invoked when the form is submitted
    event.preventDefault();

    this.props.onSignIn({
      username: this.state.username,
      password: this.state.password
    });
  }


  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="email"
            name="username"
            onChange={event => this.handleChange(event)}
            placeholder="Enter Username"
            value={this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={event => this.handleChange(event)}
            placeholder="Enter Password"
            value={this.state.password}
          />
        </FormGroup>

        <Button type="submit">
          Sign In
        </Button>
      </form>
    );
  }
}


SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired
};


export default SignIn;
