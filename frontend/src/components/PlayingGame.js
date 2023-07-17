import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './PlayingGame.module.css';



function PlayingGame(props){

  const { roomId }= useParams();
  const [player,setPlayer] = useState(0);
  const [roomData, setRoomData] = useState(null);
  const [ready, setReady]  = useState(false);
  const [isCopied, setIsCopied] = useState(false);


  const frontport = process.env.REACT_APP_FRONTPORT
  const backport =  process.env.REACT_APP_BACKPORT
  let navigate = useNavigate();



  

  const fetchRoomData = async (roomId) => {
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
    });
  }

  const removeNumberFromArray = async (roomId, arrayName, numberToRemove) => {
    return fetch(`${backport}game/data/${roomId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ arrayName, numberToRemove }),
    });
}

const startGame = async (roomId) => {
  return fetch(`${backport}game/create/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
  });
}

 



  useEffect(() =>  {
    if( localStorage.getItem('userID') != undefined){
      setPlayer(1);
    }
    const intervalID = setInterval(() => {
      fetchRoomData(roomId).then(setRoomData)
    }, 100);
    
    return () => clearInterval(intervalID);
  }, [roomId]);


  function handleClickReady(){
    localStorage.setItem('player',player)
    setReady(true);
    addReadyPerson(roomId);
  }

 

  async function handelPlayAgain(){
    setReady(false);
    setPlayer(1);
    startGame(roomId);
    
    window.location.reload();

  }

  function handleCopyClick() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000)
  }



return (

  <div> 
  
    <div>

    {roomData ? (
      <>

    {roomData.lost && <div>
        <h1>FAILURE</h1>
        
      
        {localStorage.removeItem('player')}

        
        <button onClick={handelPlayAgain}> Play again? </button>

    </div>}

    {roomData.won && !roomData.lost && <div>
        <h1>You Win!</h1>
        {localStorage.removeItem('player')}
        <button onClick={handelPlayAgain}> Play again? </button>
    </div>}

    {!roomData.won && !roomData.lost &&
    <div>
    <h1>Game in progress...</h1>


      
    { !roomData.gameStarted &&  <div>
      
      <CopyToClipboard text={`${frontport}game/${roomId}`} onCopy={handleCopyClick}>
        <button>
        <h2>{`${frontport}${roomId}`}</h2>
        Copy Link to Clipboard
        </button>
      </CopyToClipboard>
      {isCopied && <span style={{color: 'red'}}>Copied!</span>}
    </div>}

    <h2> Game Room : {roomId}</h2>

    {!ready && !roomData.gameStarted && <button onClick={handleClickReady}>Ready</button>}



           
      {roomData.gameStarted && <div>

      
      <div  className = {classes.lastPlayed} >
      Last Playted Card : {String(roomData.lastPlayedCard)}
      </div>

     {player === 0 &&  <div className= {classes.cardContainer}>
        {roomData.numbers1.map((num, index) => (

        
            <button  className = {classes.card} key={index} onClick={() => removeNumberFromArray(roomId, 'numbers1', num)}>
            {num}
            </button>
      

        ))}
        </div> }

     {player === 1 && <div className= {classes.cardContainer}>
      
        {roomData.numbers2.map((num, index) => (
          <button  className = {classes.card} key={index} onClick={() => removeNumberFromArray(roomId, 'numbers2', num)}>
          {num}
          </button>
        ))}
        </div>}

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