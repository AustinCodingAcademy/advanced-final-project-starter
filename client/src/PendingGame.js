import React from 'react';

const PendingGame = props => {
  return (
    <div id="pending-games">
      <h4>Building your game...</h4>
      <div>
        {props.pendingGame.map(movie => {
          return (
            <div  key={movie.game_id}>
              <div className='movie-card'>
                <img src={movie.poster} alt='added movie' />
              </div>
              <span className="remove-pending-movie fa fa-minus"
                onClick={() => props.removeGame(movie.game_id)}></span>
            </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default PendingGame;
