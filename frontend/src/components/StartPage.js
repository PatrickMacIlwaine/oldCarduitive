import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function StartPage(){

  let navigate = useNavigate();  

  const frontport = process.env.REACT_APP_FRONTPORT || 'https://card-frontend-5321708010c5.herokuapp.com/game/G2LBf'
  const backport = process.env.REACT_APP_BACKPORT || 'https://card-backend-bb5d6df47bd0.herokuapp.com/'

  const generateKey = () => {
    const url = '' 
    let key = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  };

 
  function starthandleClick(){
    localStorage.clear();

    const newKey = generateKey();
    localStorage.setItem('player',0)
    startGame(newKey);
    navigate(`game/${newKey}`);
  }


  const startGame = async (roomId) => {
    return fetch(`${backport}game/create/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
    });
  }

return (
  <div>
    
    <h1> Psychic! </h1>
    <div>
    <button onClick={starthandleClick}>
      <h2> Start New Game !</h2>
    </button> 
    </div>


 </div>

  
);
    
}
export default StartPage;