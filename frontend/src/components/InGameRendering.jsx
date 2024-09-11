import React from 'react';
import classes from './InGameRendering.module.css';

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
      {' '}
      {!roomData.won && !roomData.lost && (
        <div>
          {!show3 && !show2 && !show1 && roomData.gameStarted && (
            <div>
              <div className={classes.lastPlayed}>
                Last Played Card :{' '}
                <div className={classes.number}>
                  {String(roomData.lastPlayedCard)}
                </div>
              </div>
              <div className={classes.miniCardContainer}>
                {roomData.players.map(
                  (playerData) =>
                    playerID !== playerData.id && (
                      <div
                        className={classes.miniCardPlayer}
                        key={playerData.id}
                      >
                        {playerData.numbers.map((num) => (
                          <div className={classes.miniCard} key={num}>
                            {' '}
                            ?{' '}
                          </div>
                        ))}
                      </div>
                    )
                )}
              </div>
              {roomData.players.map(
                (playerData) =>
                  playerID === playerData.id && (
                    <div className={classes.cardContainer} key={playerData.id}>
                      {playerData.numbers.map((num) => (
                        <button
                          type="button"
                          className={classes.card}
                          key={num}
                          onClick={() =>
                            removeNumberFromArray(roomId, playerData.id, num)}
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
