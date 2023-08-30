import React from 'react';
import PropTypes from 'prop-types';
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
                    ),
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
                  ),
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

InGameRendering.propTypes = {
  roomData: PropTypes.shape({
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    lastPlayedCard: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  show1: PropTypes.bool.isRequired,
  show2: PropTypes.bool.isRequired,
  show3: PropTypes.bool.isRequired,
  removeNumberFromArray: PropTypes.func.isRequired,
  playerID: PropTypes.number.isRequired,
  roomId: PropTypes.string.isRequired,
};

export default InGameRendering;
