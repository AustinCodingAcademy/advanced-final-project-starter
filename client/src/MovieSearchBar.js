import React from 'react';

const MovieSearchBar = props => {
    return (
      <div>
        <input id="input-search" type="text"
          placeholder="Search by title..."
          value={props.value}
          onChange={event => props.captureSearch(event)}></input>
        <div id="send-search" onClick={value => props.goSearch(props.value)}>
          <span className="fa fa-search"></span>
        </div>
      </div>
    )
}

export default MovieSearchBar;
