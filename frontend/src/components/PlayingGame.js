import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './PlayingGame.module.css';



function PlayingGame(props){

  const { roomId }= useParams();
  const [player,setPlayer] = useState(0);
  const [ready, setReady]  = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [numberOfPlayers, setnumberOfPlayers] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const location  = useLocation();
  const [didCountDown, setdidCountDown] = useState(false);

  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);


  const frontport = process.env.REACT_APP_FRONTPORT || 'http://localhost/3000/';
  const backport =  process.env.REACT_APP_BACKPORT || 'http://localhost/3001'

  let navigate = useNavigate();

 
  const fetchRoomData = async (roomId ) => {
    return fetch(`${backport}game/data/${roomId}`)
    .then(response => {
      if (!response.ok){
        throw new Error(`HTTP error! status : ${response.status}`);
      }
      return response.json();
    })  
    .catch(e => {
      console.error('There was a problem with your fetch operation ' + e.message);
    });
  }

  const addReadyPerson = async (roomId) => {
    return fetch(`${backport}game/ready/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
    }).catch(e => console.error('Error:', e));
  }

  const removeNumberFromArray = async (roomId, playerId, numberToRemove) => {
    return fetch(`${backport}game/data/${roomId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ playerId, numberToRemove }),
    });
  }

const setLevel = async (roomId, level) => {
  return fetch(`${backport}game/resetLevel/${roomId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ level }),
});
}

const makeReady = async (roomId, playerId) => {
  return fetch(`${backport}game/setReady/${roomId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ playerId }),
});
}

const startGame = async (roomId, numberOfPlayers) => {
  return fetch(`${backport}game/create/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ numberOfPlayers }),
  });
}

const resetReadyStatus = async (roomId) => {
  return fetch(`${backport}/game/resetReady/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
  });
}


useEffect(() =>  {
  const intervalID = setInterval(() => {
    fetchRoomData(roomId)
      .then(data => {
        setRoomData(data);
        if (data.playersReady === data.playerCount) {
          if (!didCountDown) {
            countDown();
            setdidCountDown(true);
          }
        }
      });
  }, 200);

  return () => clearInterval(intervalID);
}, [roomId, numberOfPlayers, countDown]); // include all the dependencies




  function handleClickReady(){
    addReadyPerson(roomId);
    makeReady(roomId, player);
    setPlayer(roomData.playersReady);
    setReady(true);
    setdidCountDown(false);
    setTimeout(() => setReady(false), 5000);
  }

  async function handelPlayAgain(){
    setLevel(roomId,1);
    startGame(roomId, numberOfPlayers);
    
  }

  async function handelContinue(){
    startGame(roomId, numberOfPlayers); 
  }

  function handleCopyClick() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  function countDown(){
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
    
    
    setTimeout(() => setIsCopied(false), 5000);
    setdidCountDown(true);
  }



return (

  <div> 
    <div>
    {roomData ? (
    <>
    {roomData.lost && <div className={classes.failureDiv}>
        <h1 className= {classes.failure}>YOU LOSE</h1>
        <h2 className= {classes.levelTag}>Level {roomData.level}</h2>
        <button className = {classes.playAgain} onClick={handelPlayAgain}> Play again? </button>
    </div>}

    {roomData.won && !roomData.lost && <div className={classes.winDiv}>
        <h1 className= {classes.win}>You Win!</h1>
        <h2 className= {classes.levelTag}>Level {roomData.level}</h2>
        <button className = {classes.continueButton} onClick={handelContinue}> Continue </button>
    </div>}

    {!roomData.won && !roomData.lost &&
    <div>

    <div className= {classes.levelTag}>
      <h1 >Level {roomData.level}...</h1>
    </div>

    { !roomData.gameStarted &&  <div className={classes.readybuttonDiv}>
      
      <CopyToClipboard  className={classes.readybuttonDiv} text={`${window.location.href}`} onCopy={handleCopyClick}>
        <div className={classes.readybuttonDiv}>

        <button >
        <h2>{`${window.location.href}`}</h2>
        Copy Link to Clipboard
        </button>
        </div>

      </CopyToClipboard>
      {isCopied && <span style={{color: 'red'}}>Copied!</span>}
    </div>}


    { !ready && !roomData?.players[roomData?.readyPlayers]?.isReady  && !roomData.gameStarted && <div className = {classes.readybuttonDiv}>
      <button className={classes.readyButton} onClick={handleClickReady}>Ready</button> 
      </div> }

      {roomData.gameStarted && show3 && <div>
      <div  className = {classes.countDown}> 3 </div>
      </div>
      }
      {roomData.gameStarted && show2 && <div>
      <div  className = {classes.countDown}> 2 </div>
      </div>
      }
      {roomData.gameStarted && show1 && <div>
      <div  className = {classes.countDown}> 1 </div>
      </div>
      }





      { !show3 && !show2 && !show1 && roomData.gameStarted && <div>
      
      <div  className = {classes.lastPlayed} >
      Last Playted Card : {String(roomData.lastPlayedCard)}
      </div>

      {roomData.players.map((playerData, index) => (
      player == index &&
      <div className={classes.cardContainer} key={index}>
        {playerData.numbers.map((num, numIndex) => (
          <button className={classes.card} key={numIndex} onClick={() => removeNumberFromArray(roomId, index, num)}>
            {num}
          </button>
        ))}
      </div>
    ))}

        </div>}
      </div>}
      </>
    ) : (
      <div>Loading...</div>
    )}
   
  </div>
  
</div>

);
}
export default PlayingGame;