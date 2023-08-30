import React from 'react';
import PropTypes from 'prop-types';
import classes from './ReadyButton.module.css';

function ReadyButton({ handleClickReady }) {
  return (
    <div className={classes.readybuttonDiv}>
      <button type="button" className={classes.readyButton} onClick={handleClickReady}>
        READY
      </button>
    </div>
  );
}

ReadyButton.propTypes = {
  handleClickReady: PropTypes.func.isRequired,
};

export default ReadyButton;
