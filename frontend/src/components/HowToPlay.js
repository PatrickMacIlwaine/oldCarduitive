import classes from "./HowToPlay.module.css";

function HowToPlay(props) {
  function exitHandler() {
    props.onExit();
  }

  return (
    <div className={classes.modal}>
      <p className={classes.p}>
        Start CARDUITIVE with 2 to 4 players receiving random cards, numbered
        1-100. The goal is to lay these cards in ascending order without
        communicating what cards you have. You lose if a card is played out of
        turn (such as 45 before 10). Victory comes when all cards are placed
        correctly, then your level will increase.
      </p>
      <p className={classes.p}>
        Remember that you cannot tell the other player what cards you have!
      </p>
      <p className={classes.p}>
        When you start a new game you will be provided a link to invite the
        other players.
      </p>
      <p className={classes.p}>Good Luck!</p>
      <button className={classes.btn} onClick={exitHandler}>
        <h2>Exit</h2>
      </button>
    </div>
  );
}

export default HowToPlay;
