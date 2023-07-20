const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());



let messages = {};
let rooms = {};

function generateRoomData(roomId) {
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

  return {
    numbers1: addToArray(numbers, 3),
    numbers2: addToArray(numbers, 3),
    lost: false,
    won: false,
    playersReady : 0,
    gameStarted : false,
    gameCreated : true,
    lastPlayedCard : 0,
    player1Ready: false,
    player2Ready: false,
  };
}

app.post('/game/create/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  console.log(`Game Created at ${roomId}`)
  rooms[roomId] = generateRoomData(roomId);
  res.status(201).json({ success: true });
  console.log(`Post Made ${req} ${res} roomId : ${roomId}`);
});

app.post('/game/ready/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  if (roomData) {
    roomData.playersReady++;
    console.log(roomData.playersReady);
    if (roomData.playersReady === 2){
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
  const { arrayName, numberToRemove } = req.body;
  const roomData = rooms[roomId];

  if (roomData) {
    const allNumbers = [...roomData.numbers1, ...roomData.numbers2];
    const ans = secondSmallest(allNumbers);
    roomData.lastPlayedCard = numberToRemove;
    if (ans === -1) {
      roomData.won = true;
    }
    else if (numberToRemove >= ans){
      roomData.lost = true;
    }
    else{
      if (roomData.hasOwnProperty(arrayName)) {
        roomData[arrayName] = roomData[arrayName].filter(num => num !== numberToRemove);

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











app.post('/message/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (!messages[roomId]) {
    messages[roomId] = [];
  }
  messages[roomId].push(req.body);
  res.status(204).end();
  console.log(`Post Made ${req} ${res} roomId : ${roomId}`);
});

app.get('/message/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (!messages[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(messages[roomId]);
});

app.delete('/message/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (!messages[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  delete messages[roomId];
  res.status(204).end();
  console.log(`Room Delete -  ${req} ${res} roomId : ${roomId}`);
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});