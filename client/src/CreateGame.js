import React from 'react';
import MovieSearchBar from './MovieSearchBar';
import MovieSearchResults from './MovieSearchResults';
import PendingGame from './PendingGame';
import axios from 'axios';

class CreateGame extends React.Component {
  constructor() {
    super();

    this.game = [];

    this.state = {
      pendingGame: [],
      searchText: '',
      nameText: '',
      searchResult: [],
      showResults: false,
      searchMessage: ''
    };
  }

  componentDidMount() {
    if(this.props.isUpdate) {
      axios.get(`/api/movie-games/${this.props.id}`,{
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(resp => {
        this.game = resp.data.game;
        this.setState({
          pendingGame: this.game,
          nameText: resp.data.name
        });
      })
      .catch(err => console.log('get gamer error',err));
    }
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

  saveThisGame() {
    if(this.game.length === 0) {
      this.setState({
        searchMessage: 'Um... you have no movies in your game!'
      });
      return;
    } else if(this.state.nameText === '') {
      this.setState({
        searchMessage: 'This awesome game needs a name!'
      });
      return;
    } else {
      const saveGame = {name: this.state.nameText, game: this.game};
      axios.post('/api/movie-games', saveGame, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.props.buildGame(this.game);
      })
      .then(() => {
        console.log("saved game", this.state.nameText);
      })
      .catch(err => {console.log("save error",err)});
    }
  }

  updateThisGame(id) {
    const updateGame = {name: this.state.nameText, game: this.game};
    axios.put(`/api/movie-games/${id}`, updateGame, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(() => {
      this.props.buildGame(this.game);
    })
    .then(() => {
      console.log("updated game", this.state.nameText);
    })
    .catch(err => {console.log("update error",err)});
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
    var x = 0;
    if(this.game.length === 0) {
      x = 1;
    } else {
      x = this.game[this.game.length - 1].game_id + 1;
    };
    this.game.push({
      game_id: x,
      poster: movie,
      showPoster: false,
      clickable: true,
      matched: false
    });
    console.log('added this game', this.game);
    this.setState({
      pendingGame: this.game
    });
  }

  removeMovieFromGame(id) {
    let updatedPendingGame = this.state.pendingGame.filter(movie => movie.game_id !== id);
    console.log('trying to remove movie from game', id);
    this.game = updatedPendingGame;
    this.setState({
      pendingGame: updatedPendingGame
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
        <div id='load-game' onClick={() => {this.props.isUpdate ? this.updateThisGame(this.props.id) :
          this.saveThisGame()}}>Load Game</div>
        <div className='reset-mygames' onClick={() => this.props.resetMyGames()}>Nevermind</div>
        <input id="input-gamename" type="text"
          placeholder="Name this game..."
          maxLength="30"
          value={this.state.nameText}
          onChange={event => this.captureName(event)}></input>
        <p>{this.state.searchMessage}</p>
        <div id="working-search">
          <PendingGame pendingGame={this.state.pendingGame}
            removeGame={this.removeMovieFromGame.bind(this)}/>
          <MovieSearchResults searchResult={this.state.searchResult}
            addMovie={this.addMovieToGame.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default CreateGame;
