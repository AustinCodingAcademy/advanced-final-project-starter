import React from 'react';

const MovieSearchResults = props => {
  return (
    <div className="returned-movie">
      <h4>Search Results...</h4>
      {props.searchResult.map(movie => {
        return (
          <div key={movie.tmdb_id}>
            <span className="fa fa-plus-square fa-2x plus-movie"
              onClick={() => props.addMovie(movie.poster_path)}></span>
              <h4>{movie.title} - {movie.release_date}</h4>
          </div>
        )}
      )}
    </div>
  )
};

export default MovieSearchResults;
