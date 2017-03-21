import React, { Component } from 'react';
import axios from 'axios';

class Secret extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    axios.get('/api/secret', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          ...this.state,
          message: resp.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}

export default Secret;
