import React, { Component } from 'react';
import ListedMovie  from './ListedMovie';
import axios from 'axios';

class GameList extends Component {
  constructor() {
    super();

    this.list = [],

    this.state = {
      gameList: []
    }
  }

  componentDidMount() {
    console.log('getting games');
    axios.get('/api/movie-games')
    .then(resp => {
      this.list = resp.data;
      console.log('got games', resp);
      console.log('get response', this.list);
      this.setState({
        gameList: resp.data
      });
    })
    .catch(err => console.log("failed to load games", err));
  }

  render() {
    return (
      <div id="game-list">
      {this.state.gameList.map(game => {
        return (
          <ListedMovie key={game._id}
            id={game._id}
            poster={game.game[0].poster}
            gameName={game.name}
            buildGame={this.props.buildGame.bind(this)} />
          )
        })
      }
      </div>
    )
  }
}

export default GameList;
