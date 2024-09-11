import React from 'react';
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


export default BeforeGameStarts;
