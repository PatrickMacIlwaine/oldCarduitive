const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());



let messages = {};
let rooms = {};

function generateRoomData(roomId, numberOfPlayers) {
  let level = rooms[roomId] ? rooms[roomId].level + 1 : 1;
  const numbers = [];  

  for (let i = 1; i <= 100; i++) {
    numbers.push(i);
  }

  function addToArray(arr, numElements) {
    const removedElements = [];
    for (let i = 0; i < numElements; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const removedElement = arr.splice(randomIndex, 1)[0];
      removedElements.push(removedElement);
    }
    return removedElements;
  }

  const playerCount = rooms[roomId] ? rooms[roomId].playerCount : numberOfPlayers;
  const players = [];

  for (let i = 0; i < playerCount; i++) {
    const isReady = rooms[roomId] ? rooms[roomId].players[i].isReady : false;

    players.push({
      id: i,
      isReady: isReady,
      numbers: addToArray(numbers, level)
    });
  }

  return {
    lost: false,
    won: false,
    playersReady: 0,
    numberOfConnectedPlayers: 0, 
    gameStarted: false,
    gameCreated: true,
    lastPlayedCard: 0,
    playerCount: playerCount,
    playAgain: 0,
    level: level, 
    players: players,
  };
}


app.post('/game/create/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const numberOfPlayers = req.body.numberOfPlayers;
  console.log(`Game Created at ${roomId} with ${(numberOfPlayers)} number of players` );
  const roomData = generateRoomData(roomId, numberOfPlayers);
  roomData.playersReady = 0;
  roomData.gameStarted = false;
  rooms[roomId] = roomData;
  res.status(201).json({ success: true });
  console.log(`Post Made ${req} ${res} roomId : ${roomId}`);
});




app.post('/game/connect/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (!rooms[roomId]) {
    res.status(404).json({error: "Room not found"});
  }
  const roomData = rooms[roomId];
  roomData.connectedPlayers += 1;
  const playerId = roomData.connectedPlayers;
  res.status(201).json({ success: true, playerId });
});

app.patch('/game/resetLevel/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  const { level } = req.body;
  if (roomData){
    roomData.level = 0;
    roomData.playersReady = 0;

    console.log("reset level");
    res.status(200).json({message: "Rest Level"});
  }else {
    res.status(404).json({error: "Room not found"});
  }
});

app.patch('/game/setReady/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  const { playerId } = req.body;

  if (roomData){
    roomData.players[playerId].isReady = true;
    console.log(`Player ${playerId} is Ready`);
    res.status(200).json({message: "Set Ready"});
    
  }else {
    res.status(404).json({error: "Player or Room not found"});
  }
});

app.post('/game/ready/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  if (roomData) {
    roomData.playersReady++;
    setTimeout(() => roomData.playersReady--, 5000);
    console.log(roomData.playersReady);
    if (roomData.playersReady % roomData.playerCount == 0){
      roomData.gameStarted = true;
      console.log("gameStarted");
    }
    res.status(200).json({message: "Player is ready"});
  } else {
    res.status(404).json({error: "Room not found"});
  }
});



app.get('/game/data/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  if (roomData) {
    res.json(roomData);
  } else {
    res.status(404).json({ error: 'Room not Found' });
  }
});


app.patch('/game/data/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const { playerId, numberToRemove } = req.body;
  const roomData = rooms[roomId];
  if (roomData) {
    const allNumbers = roomData.players.reduce((arr, player) => [...arr, ...player.numbers], []);
    const ans = secondSmallest(allNumbers);
    roomData.lastPlayedCard = numberToRemove;
    if (ans === -1) {
      roomData.won = true;
      res.json(roomData);
    }
    else if (numberToRemove >= ans){
      roomData.lost = true;
      res.json(roomData);
    }
    else {
      const player = roomData.players.find(player => player.id === playerId);
      if (player) {
        player.numbers = player.numbers.filter(num => num !== numberToRemove);
        res.json(roomData);
      }
    } 
  }
});

  
function secondSmallest(arr) {
  if (arr.length < 2) {
      return -1
  }
  let min = Infinity;
  let secondMin = Infinity;
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
          secondMin = min;
          min = arr[i];
      } else if (arr[i] < secondMin && arr[i] > min) {
          secondMin = arr[i];
      }
  }
     return secondMin;
}



const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});