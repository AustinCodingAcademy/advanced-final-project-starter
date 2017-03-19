import React from 'react';

const PendingGame = props => {
  return (
    <div id="pending-games">
      <h4>Building your game...</h4>
      <div>
        {props.pendingGame.map(movie => {
          return (
            <div className='movie-card' key={movie.game_id}>
              <img src={movie.poster} alt='added movie' />
            </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default PendingGame;
