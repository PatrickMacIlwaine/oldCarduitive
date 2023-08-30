import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './StartPage.module.css';
import HowToPlay from './HowToPlay';
import Backdrop from './Backdrop';

function StartPage() {
  const navigate = useNavigate();
  const [startGamePressed, setstartGamePressed] = useState(false);
  const [loading, setloading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const backport =
    process.env.REACT_APP_BACKPORT ||
    'https://card-backend-bb5d6df47bd0.herokuapp.com/';

  function handelHowToPlay() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  const generateKey = () => {
    let key = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i += 1) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  };

  const startGame = async (roomId, numberOfPlayers) =>
    fetch(`${backport}game/create/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numberOfPlayers }),
    });

  const pageExists = async (roomId) =>
    fetch(`${backport}game/exists/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  async function goNextPage(key) {
    console.log(pageExists(key));
    const go = await pageExists(key);
    console.log(key);
    if (go) {
      navigate(`game/${key}`);
    } else {
      setTimeout(() => {
        goNextPage(key);
      }, 2000);
    }
  }

  function nextPage(numplayers) {
    const newKey = generateKey();
    startGame(newKey, numplayers);
    setloading(true);
    goNextPage(newKey);
  }

  function starthandleClick() {
    setstartGamePressed(true);
  }

  return (
    <div className={classes.startDiv}>
      <h1 className={classes.title}> CARDUITIVE! </h1>
      {!startGamePressed && (
        <button
          type="button"
          className={classes.startButton}
          onClick={starthandleClick}
        >
          <h2> Start New Game !</h2>
        </button>
      )}
      {loading && (
        <button type="button" className={classes.startButton} onClick={starthandleClick}>
          <h2> Loading !</h2>
        </button>
      )}
      {!loading && startGamePressed && (
        <div>
          <h2>How many players?</h2>
          <button
            type="button"
            className={classes.startButton}
            onClick={() => nextPage(2)}
          >
            2
          </button>
          <button
            type="button"
            className={classes.startButton}
            onClick={() => nextPage(3)}
          >
            3
          </button>
          <button
            type="button"
            className={classes.startButton}
            onClick={() => nextPage(4)}
          >
            4
          </button>
        </div>
      )}
      <div>
        {!modalIsOpen && (
          <button
            type="button"
            className={classes.howToPlayButton}
            onClick={handelHowToPlay}
          >
            How to Play
          </button>
        )}
      </div>
      {modalIsOpen && <HowToPlay onExit={closeModalHandler} />}
      {modalIsOpen && (
        <Backdrop onExit={closeModalHandler} onClose={closeModalHandler} />
      )}
    </div>
  );
}
export default StartPage;
