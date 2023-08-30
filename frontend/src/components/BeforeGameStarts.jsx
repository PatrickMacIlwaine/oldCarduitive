import React from 'react';
import PropTypes from 'prop-types';
import ReadyButton from './ReadyButton';
import Countdown from './Countdown';
import CopyLink from './CopyLink';
import Level from './Level';

function BeforeGameStarts({
  roomData,
  handleCopyClick,
  isCopied,
  ready,
  show1,
  show2,
  show3,
  handleClickReady,
}) {
  if (!roomData.won && !roomData.lost && !ready && !roomData.gameStarted) {
    return (
      <>
        <Level roomData={roomData} />
        <CopyLink
          roomData={roomData}
          gameStarted={roomData.gameStarted}
          handleCopyClick={handleCopyClick}
          isCopied={isCopied}
        />
        <ReadyButton handleClickReady={handleClickReady} />
      </>
    );
  }

  return (
    <>
      <Level roomData={roomData} />
      <CopyLink
        roomData={roomData}
        gameStarted={roomData.gameStarted}
        handleCopyClick={handleCopyClick}
        isCopied={isCopied}
      />
      <Countdown
        roomData={roomData}
        show1={show1}
        show2={show2}
        show3={show3}
      />
    </>
  );
}

BeforeGameStarts.propTypes = {
  roomData: PropTypes.shape({
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired,
  }).isRequired,
  handleCopyClick: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  show1: PropTypes.bool.isRequired,
  show2: PropTypes.bool.isRequired,
  show3: PropTypes.bool.isRequired,
  handleClickReady: PropTypes.func.isRequired,
};

export default BeforeGameStarts;
