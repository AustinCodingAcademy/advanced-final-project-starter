import React, { Component } from 'react';

const GameScore = props => {
  return (
    <div id='game-score'>{props.gameStatus === 'inprogress' || props.gameStatus === 'complete' ? <h3>Score: {props.gameScore}</h3> : null}</div>
  )
}

export default GameScore;
