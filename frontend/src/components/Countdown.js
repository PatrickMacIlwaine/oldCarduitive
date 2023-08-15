import classes from  './Countdown.module.css';
import React from "react";


function Countdown({gameStarted, show1, show2, show3}){
  return (
    <>
    { gameStarted && show3 && <div className={classes.countDown}>3</div>}
    { gameStarted && show2 && <div className={classes.countDown}>2</div>}
    { gameStarted && show1 && <div className={classes.countDown}>1</div>}
    </>
  )}
  export default Countdown;


