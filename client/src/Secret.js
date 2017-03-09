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
      // Passing token via authorization header
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
      /* eslint no-console: 0 */
      .catch(err => console.log(err));
  }


  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}


export default Secret;
