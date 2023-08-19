import React from "react";
import classes from "./LostPage.module.css";

function LostPage({ level, handelPlayAgain, lastPlayedCard }) {
  return (
    <>
      <div className={classes.failureDiv}>
        <h1 className={classes.failure}>YOU LOSE</h1>
        <h2> Last Played Card : {lastPlayedCard}</h2>
        <h2> Level {level}</h2>
        <button className={classes.playAgain} onClick={handelPlayAgain}>
          {" "}
          Play again?{" "}
        </button>
      </div>
    </>
  );
}
export default LostPage;
