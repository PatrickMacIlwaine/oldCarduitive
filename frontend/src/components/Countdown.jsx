import React from 'react';
import PropTypes from 'prop-types';
import classes from './Countdown.module.css';

function Countdown({ roomData, show1, show2, show3 }) {
  return (
    <>
      {roomData.gameStarted && show3 && (
        <div className={classes.countDown}>3</div>
      )}
      {roomData.gameStarted && show2 && (
        <div className={classes.countDown}>2</div>
      )}
      {roomData.gameStarted && show1 && (
        <div className={classes.countDown}>1</div>
      )}
    </>
  );
}

Countdown.propTypes = {
  roomData: PropTypes.shape({
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired,
  }).isRequired,
  show1: PropTypes.bool.isRequired,
  show2: PropTypes.bool.isRequired,
  show3: PropTypes.bool.isRequired,
};

export default Countdown;
