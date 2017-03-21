import React from 'react';
import axios from 'axios';

class ListedMovie extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('listed game',this.props.gameName);
  }

  launchGame (launchID) {
    console.log(`/api/movie-games/${launchID}`);
    axios.get(`/api/movie-games/${launchID}`)
    .then(resp => {
      this.props.buildGame(resp.data.game)
    })
    .catch(err => console.log("failure to launch",err));
  }

  render() {
    return (
      <div key={this.props.id}>
        <div>
          <img src={this.props.poster} alt="game poster"/>
        </div>
        <h3>{this.props.gameName}</h3>
        <div className="launch-game" onClick={() => this.launchGame(this.props.id)}>Play</div>
        <div className="mini-menu">
          <span className="fa fa-caret-square-o-left"></span>
          <span className="fa fa-pencil"></span>
          <span className="fa fa-trash"></span>
        </div>
      </div>
    )
  }
}

export default ListedMovie;
