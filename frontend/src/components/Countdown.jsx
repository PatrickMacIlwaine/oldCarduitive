import React from 'react';
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



export default Countdown;
