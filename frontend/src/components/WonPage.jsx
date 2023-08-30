import React from 'react';
import PropTypes from 'prop-types';
import classes from './WonPage.module.css';

function WonPage({ level, handleContinue, history }) {
  return (
    <div className={classes.winDiv}>
      <h1 className={classes.win}>You Win!</h1>
      <h2>Cards played : {String(history)}</h2>
      <h2 className={classes.levelTag}>Level {level}</h2>
      <button type="button" className={classes.continueButton} onClick={handleContinue}>
        {' '}
        Continue
        {' '}
      </button>
    </div>
  );
}
WonPage.propTypes = {
  level: PropTypes.number.isRequired,
  handleContinue: PropTypes.func.isRequired,
  history: PropTypes.number.isRequired,
};
export default WonPage;
