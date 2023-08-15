import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './CopyLink.module.css';

function CopyLink({won, lost, gameStarted , handleCopyClick ,isCopied}) {
  return(
    <>
    { !won && !lost && !gameStarted && <div>
    <CopyToClipboard  className={classes.readybuttonDiv} text={`${window.location.href}`} onCopy={handleCopyClick}>
      <div className={classes.readybuttonDiv}>
      <button >
      <h2>{`${window.location.href}`}</h2>
      Copy Link to Clipboard
      </button>
      </div>
    </CopyToClipboard>
    {isCopied && <span style={{color: 'red'}}>Copied!</span>}
            
  </div> }
  </>
  )
}
export default CopyLink