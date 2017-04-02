import React from 'react';

const GameMessage = props => {
  return (
    <div id='game-message'>
      <h3>{props.message}</h3>
    </div>
  )
}

export default GameMessage;
