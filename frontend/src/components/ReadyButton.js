import classes from './ReadyButton.module.css';

function ReadyButton({won, lost, ready, gameStarted, handleClickReady}) {


return (
  <>  
  { !won && !lost && !ready && !gameStarted && 
  <div className = {classes.readybuttonDiv}>
   <button className={classes.readyButton} onClick={handleClickReady}>Ready</button> 
  </div> 
  } 
  </>
  );
}
export default ReadyButton;