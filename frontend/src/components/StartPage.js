import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import classes from './StartPage.module.css';
import Modal from './Modal';
import Backdrop from './Backdrop';


function StartPage(){

  let navigate = useNavigate();  

  const [startGamePressed, setstartGamePressed] = useState(false);
  const [modelOpen, setmodalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [ modalIsOpen, setModalIsOpen ] = useState(false);


  const frontport = process.env.REACT_APP_FRONTPORT || 'https://card-frontend-5321708010c5.herokuapp.com/game/G2LBf'
  const backport = process.env.REACT_APP_BACKPORT || 'https://card-backend-bb5d6df47bd0.herokuapp.com/'

    function handelHowToPlay(){
        setModalIsOpen(true);
    }

    function closeModalHandler(){
        setModalIsOpen(false)
    }


  const generateKey = () => {
    const url = '' 
    let key = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  };

  function nextPage2(){
    localStorage.clear();
    const newKey = generateKey();
    localStorage.setItem('player',1)
    startGame(newKey, 2);
    setloading(true);
    setTimeout(() => {
      navigate(`game/${newKey}`);
  }, 2000);
  }
  function nextPage3(){
    localStorage.clear();
    const newKey = generateKey();
    localStorage.setItem('player',1)
    startGame(newKey, 3);
    setloading(true);
    setTimeout(() => {
      navigate(`game/${newKey}`);
  }, 2000);
  }
    function nextPage4(){
    localStorage.clear();
    const newKey = generateKey();
    localStorage.setItem('player',1)
    startGame(newKey, 4);
    setloading(true);
    setTimeout(() => {
      navigate(`game/${newKey}`);
  }, 2000);
  }

 
  function starthandleClick(){
    setstartGamePressed(true);
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



return (
  <div className={classes.startDiv}>

  

   
    
    <h1 className= {classes.title}> CARDUITIVE! </h1>
   
    { !startGamePressed && <button className={classes.startButton} onClick={starthandleClick}>
      <h2> Start New Game !</h2>
    </button> }

    { loading && <div className={classes.startButton} onClick={starthandleClick}>
      <h2> Loading !</h2>
    </div> }



    {!loading && startGamePressed &&
    <div>
      <h2>How many players?</h2>
      <button className={classes.startButton} onClick = {nextPage2}    >2</button>
      <button className={classes.startButton} onClick = {nextPage3}    >3</button>
      <button className={classes.startButton} onClick = {nextPage4}    >4</button>
    </div>
   } 

    <div>
      {!modalIsOpen && 
      <button  className = {classes.howToPlayButton} onClick={ handelHowToPlay }>
        How to Play
      </button> }
    </div>

    { modalIsOpen && <Modal onExit={closeModalHandler}/> }
    { modalIsOpen && <Backdrop onExit={closeModalHandler} onClose = {closeModalHandler}/> }
  


 </div>

  
);
    
}
export default StartPage;