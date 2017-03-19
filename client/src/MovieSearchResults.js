import React from 'react';

class MovieSearchResults extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="returned-movie">
        <h4>Search Results...</h4>
        {this.props.searchResult.map(movie => {
          return (
            <div key={movie.tmdb_id}>
              <span className="fa fa-plus-square fa-2x plus-movie"
                onClick={() => this.props.addMovie(movie.poster_path)}></span>
                <h4>{movie.title} - {movie.release_date}</h4>
            </div>
          )}
        )}
      </div>
    )
  }

}

export default MovieSearchResults;
