import React from "react";
import classes from "./WonPage.module.css";

function WonPage({ level, handelContinue }) {
  return (
    <>
      <div className={classes.winDiv}>
        <h1 className={classes.win}>You Win!</h1>
        <h2 className={classes.levelTag}>Level {level}</h2>
        <button className={classes.continueButton} onClick={handelContinue}>
          {" "}
          Continue{" "}
        </button>
      </div>
    </>
  );
}
export default WonPage;
