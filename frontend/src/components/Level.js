import classes from "./Level.module.css";

function Level({ roomData }) {
  return (
    <>
      {roomData && (
        <div className={classes.levelTag}>
          <h1>Level {roomData.level}...</h1>
        </div>
      )}
    </>
  );
}
export default Level;
