import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './PlayingGame.module.css';
import LostPage from './LostPage';
import WonPage from './WonPage';
import InGameRendering from './InGameRendering';
import BeforeGameStarts from './BeforeGameStarts';

function PlayingGame() {
  const { roomId } = useParams();
  const [playerID, setPlayerID] = useState(0);
  const [ready, setReady] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [didCountDown, setdidCountDown] = useState(false);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [error, seterror] = useState(null);
  const frontport = process.env.REACT_APP_FRONTPORT || 'http://localhost/3000/';
  const backport = process.env.REACT_APP_BACKPORT || 'http://localhost/3001';
  const numberOfPlayers = 0;

  const fetchRoomData = async (room) =>
    fetch(`${backport}game/data/${room}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status : ${response.status}`);
        }
        return response.json();
      })
      .catch((e) => {
        seterror(e.message);
        console.error(
          `There was a problem with your fetch operation , ${e.message}`
        );
      });

  const addReadyPerson = async (room) => {
    try {
      const response = await fetch(`${backport}game/ready/${room}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((e) => console.error('Error:', e));
      if (!response.ok) {
        throw new Error(`HTTP error! Status : ${response}`);
      }
      const responseData = await response.json();
      const varPlayerID = responseData.readyPlayersCount;
      setPlayerID(varPlayerID - 1);
    } catch (e) {
      console.error('Error:', e);
      throw e;
    }
  };

  useEffect(() => {
    console.log('player ID: ');
    console.log(playerID);
  }, [playerID]);

  const removeNumberFromArray = async (room, playerId, numberToRemove) =>
    fetch(`${backport}game/data/${room}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerId, numberToRemove }),
    });

  const setLevel = async (room, level) =>
    fetch(`${backport}game/resetLevel/${room}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level }),
    });

  const nextRound = async (room) =>
    fetch(`${backport}game/continue/${room}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const startGame = async (room) =>
    fetch(`${backport}game/create/${room}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numberOfPlayers }),
    });

  function countDown() {
    setshow3(true);
    setTimeout(() => {
      setshow3(false);
      setshow2(true);
    }, 1000);
    setTimeout(() => {
      setshow2(false);
      setshow1(true);
    }, 2000);
    setTimeout(() => {
      setshow1(false);
    }, 3000);
    setTimeout(() => setReady(false), 4000);
    setTimeout(() => setIsCopied(false), 5000);
    setdidCountDown(true);
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      fetchRoomData(roomId).then((data) => {
        if (data) {
          setRoomData(data);
          if (data.playersReady === data.playerCount) {
            if (!didCountDown) {
              countDown();
              setdidCountDown(true);
            }
          }
        }
      });
    }, 120);
    return () => clearInterval(intervalID);
  }, [roomId, numberOfPlayers, countDown]);

  function handleClickReadyFunction() {
    addReadyPerson(roomId);
    setReady(true);
    setdidCountDown(false);
  }

  async function handlePlayAgainFunction() {
    await nextRound(roomId);
  }

  async function handleContinueFunction() {
    await nextRound(roomId);
  }

  function handleCopyClickFunction() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  if (error) {
    return (
      <div>
        <h1>Error :{error}</h1>
        <Link className={classes.link} to={frontport}>
          Return to home
        </Link>
      </div>
    );
  }

  if (roomData && roomData.won) {
    return (
      <WonPage
        won={roomData.won}
        level={roomData.level}
        handleContinue={handleContinueFunction}
        history={roomData.history}
      />
    );
  }

  if (roomData && roomData.lost) {
    return (
      <LostPage
        playedCards={roomData.playedCards}
        level={roomData.level}
        handelPlayAgain={handlePlayAgainFunction}
        history={roomData.history}
        nextCard={roomData.nextCard}
      />
    );
  }

  if (roomData && !roomData.lost && roomData.gamestarted) {
    return (
      <BeforeGameStarts
        roomData={roomData}
        isCopied={isCopied}
        handleCopyClick={handleCopyClickFunction}
        ready={ready}
        handleClickReady={handleClickReadyFunction}
        show1={show1}
        show2={show2}
        show3={show3}
      />
    );
  }

  return (
    <div>
      <div>
        {roomData ? (
          <>
            <BeforeGameStarts
              roomData={roomData}
              isCopied={isCopied}
              handleCopyClick={handleCopyClickFunction}
              ready={ready}
              handleClickReady={handleClickReadyFunction}
              show1={show1}
              show2={show2}
              show3={show3}
            />

            <InGameRendering
              roomData={roomData}
              show1={show1}
              show2={show2}
              show3={show3}
              removeNumberFromArray={removeNumberFromArray}
              playerID={playerID}
              roomId={roomId}
            />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
export default PlayingGame;
