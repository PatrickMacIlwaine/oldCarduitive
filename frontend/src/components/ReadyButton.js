import classes from "./ReadyButton.module.css";

function ReadyButton({ handleClickReady }) {
  return (
    <>
      <div className={classes.readybuttonDiv}>
        <button className={classes.readyButton} onClick={handleClickReady}>
          READY
        </button>
      </div>
    </>
  );
}
export default ReadyButton;
