import React from "react";
import classes from "./InGameRendering.module.css";

function InGameRendering({
  roomData,
  show1,
  show2,
  show3,
  removeNumberFromArray,
  playerID,
  roomId,
}) {
  return (
    <>
      {!roomData.won && !roomData.lost && (
        <div>
          {!show3 && !show2 && !show1 && roomData.gameStarted && (
            <div>
              <div className={classes.lastPlayed}>
                Last Played Card : <div className={classes.number }>{String(roomData.lastPlayedCard)}</div>
              </div>

              <div className={classes.miniCardContainer}>
                {roomData.players.map(
                  (playerData, index) =>
                    playerID != index && (
                      <div className={classes.miniCardPlayer} key={index}>
                        {playerData.numbers.map((numIndex) => (
                          <div className={classes.miniCard} key={numIndex}>
                            {" "}
                            ?{" "}
                          </div>
                        ))}
                      </div>
                    )
                )}
              </div>

              {roomData.players.map(
                (playerData, index) =>
                  playerID == index && (
                    <div className={classes.cardContainer} key={index}>
                      {playerData.numbers.map((num, numIndex) => (
                        <button
                          className={classes.card}
                          key={numIndex}
                          onClick={() =>
                            removeNumberFromArray(roomId, index, num)
                          }
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default InGameRendering;
