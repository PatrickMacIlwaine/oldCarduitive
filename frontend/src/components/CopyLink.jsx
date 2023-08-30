import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './CopyLink.module.css';

function CopyLink({ roomData, handleCopyClick, isCopied }) {
  return (
    !roomData.won
    && !roomData.lost
    && !roomData.gameStarted && (
      <div>
        <CopyToClipboard
          className={classes.readybuttonDiv}
          text={`${window.location.href}`}
          onCopy={handleCopyClick}
        >
          <div className={classes.readybuttonDiv}>
            <button type="button">
              <h2>{`${window.location.href}`}</h2>
              Copy Link to Clipboard
            </button>
          </div>
        </CopyToClipboard>
        {isCopied && <span style={{ color: 'red' }}>Copied!</span>}
      </div>
    )
  );
}

CopyLink.propTypes = {
  roomData: PropTypes.shape({
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired,
  }).isRequired,
  handleCopyClick: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
};

export default CopyLink;
