import React from 'react';

class MovieCard extends React.Component {
  constructor() {
    super();
  }

  clickMovie() {
    console.log('clicked movie');
    if(this.props.clickable && this.props.gameReady) {
      this.props.handleSelection({game_id: this.props.game_id, poster: this.props.memoryImage});
    } else {
      return;
    }
  }

  render() {
    return (
      <div className={this.props.matched ? 'movie-card movie-card-matched' : 'movie-card movie-card-unmatched'} onClick={() => this.clickMovie()}>
        {this.props.showPoster ? <img src={this.props.memoryImage} /> : null}
      </div>
    )
  }
}

export default MovieCard;
