import React from 'react';
import MovieSearchBar from './MovieSearchBar';
import MovieSearchResults from './MovieSearchResults';
import PendingGame from './PendingGame';
import axios from 'axios';

class PlayArea extends React.Component {
  constructor() {
    super();

    this.game = [];

    this.state = {
      pendingGame: [],
      searchText: '',
      nameText: '',
      searchResult: [],
      showResults: false
    };
  }

  captureSearch(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  captureName(event) {
    this.setState({
      nameText: event.target.value
    });
  }

  goSearch(search) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f092d5754221ae7340670fea92139433&language=en-US&query=${search}&page=1&include_adult=false`)
    .then(resp => {
      const RESULT = resp.data.results.map(resultMovie => {
        return (
          {
            tmdb_id: resultMovie.id,
            title: resultMovie.title,
            poster_path: 'https://image.tmdb.org/t/p/w154' + resultMovie.poster_path,
            release_date: this.formatDate(resultMovie.release_date)
          }
        )
      });
      this.setState({
        searchResult: RESULT,
        showResults: true
      });
    })
    .catch(err => {
        console.log(`Search Error! ${err}`)
    });
  }

  addMovieToGame(movie) {
    var x = this.game.length + 1;
    this.game.push({
      game_id: x,
      poster: movie,
      showPoster: false,
      clickable: true,
      matched: false
    });
    console.log('this game', this.game);
    this.setState({
      pendingGame: this.game
    });
  }

  formatDate(date) {
    let arrDate = date.split('-');
    return arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
  }

  render() {
    return (
      <div id="create-movie-game">
        <h2>Create your game...</h2>
        <MovieSearchBar
          captureSearch={this.captureSearch.bind(this)}
          goSearch={this.goSearch.bind(this)}
          value={this.state.searchText}/>
        <div id='load-game' onClick={() => this.props.buildGame(this.game)}>Load Game</div>
        <input id="input-gamename" type="text" placeholder="Name this game..." value={this.state.nameText} onChange={event => this.props.captureName(event)}></input>
        <div id="working-search">
          <PendingGame pendingGame={this.state.pendingGame}/>
          <MovieSearchResults searchResult={this.state.searchResult}
            addMovie={this.addMovieToGame.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default PlayArea;
