import { React } from 'react';
import classes from './LostPage.module.css';

function LostPage({ level, handelPlayAgain, history, nextCard }) {
  return (
    <div className={classes.failureDiv}>
      <h1 className={classes.failure}>YOU LOSE</h1>
      <h2>Cards played : {String(history)}</h2>
      <h2>Should have played : {String(nextCard)}</h2>
      <h2>
        Level {level}
      </h2>
      <button
        type="button"
        className={classes.playAgain}
        onClick={handelPlayAgain}
      >
        Play again?
      </button>
    </div>
  );
}


export default LostPage;
