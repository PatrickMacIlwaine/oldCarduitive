const express = require("express");
const cors = require("cors");
const AsyncLock = require("async-lock");
const app = express();
const lock = new AsyncLock();
app.use(cors());
app.use(express.json());

let messages = {};
let rooms = {};

function generateRoomData(roomId, numberOfPlayers, level) {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1); // [1,2,3...100]
  const history = []
  

  const distributeCards = () => {
    const removedElements = [];
    for (let i = 0; i < level; i += 1) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const removedElement = numbers.splice(randomIndex, 1)[0];
      removedElements.push(removedElement);
    }
    return removedElements;
  };

  const playerCount = rooms[roomId]
    ? rooms[roomId].playerCount
    : numberOfPlayers;
  const players = Array.from({ length: playerCount }, (_, i) => ({
    id: i,
    numbers: distributeCards(),
  }));

  let nextCard = 0;
  
  return {
    lost: false,
    won: false,
    playersReady: 0,
    numberOfConnectedPlayers: 0,
    gameStarted: false,
    lastPlayedCard: 0,
    playerCount: playerCount,
    playAgain: 0,
    level: level,
    players: players,
    history: history,
    nextCard : nextCard
  };
}

app.post("/game/create/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  lock.acquire(roomId, async (done) => {
    const numberOfPlayers = req.body.numberOfPlayers;
    console.log(
      `Game Created at ${roomId} with ${numberOfPlayers} number of players`,
    );
    if (!rooms[roomId]) {
      const roomData = generateRoomData(roomId, numberOfPlayers, 1);
      roomData.playersReady = 0;
      roomData.gameStarted = false;
      rooms[roomId] = roomData;
    } else {
      const level = rooms[roomId].level;
      const roomData = generateRoomData(roomId, numberOfPlayers, level);
      roomData.playersReady = 0;
      roomData.gameStarted = false;
      rooms[roomId] = roomData;
    }
    res.status(201).json({ success: true });
    console.log(`Post Made ${req} ${res} roomId : ${roomId}`);
    done();
  });
});

const continueGame = (roomId) => {
  lock.acquire(roomId, async (done) => {
    roomData = rooms[roomId];
    if (roomData.won) {
      roomData = generateRoomData(roomId, roomData.numberOfPlayers, roomData.level + 1);
      roomData.playersReady = 0;
      roomData.gameStarted = false;
      rooms[roomId] = roomData;
    } else if (roomData.lost) {
      roomData = generateRoomData(roomId, roomData.numberOfPlayers, 1);
      roomData.playersReady = 0;
      roomData.gameStarted = false;
      rooms[roomId] = roomData;
    }
    done();
  });
};

app.post("/game/connect/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  if (!rooms[roomId]) {
    res.status(404).json({ error: "Room not found" });
  }
  const roomData = rooms[roomId];
  roomData.connectedPlayers += 1;
  const playerId = roomData.connectedPlayers;
  res.status(201).json({ success: true, playerId });
});

app.patch("/game/continue/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  continueGame(roomId);
  let response = {
    status: 200,
    body: {
      message: 'continued game',
    },
  };
  res.status(response.status);
});

app.post("/game/ready/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  lock.acquire(roomId, async (done) => {
    const roomData = rooms[roomId];
    let response;
    if (roomData) {
      roomData.playersReady++;
      if (roomData.playersReady == roomData.playerCount) {
        roomData.gameStarted = true;
        console.log("gamestarted");
      }
      response = {
        status: 200,
        body: {
          message: "Set Ready",
          readyPlayersCount: roomData.playersReady,
        },
      };
    } else {
      response = {
        status: 404,
        body: { error: "Player or Room not found" },
      };
    }
    console.log(`Response for Room ${roomId}:`, response);
    res.status(response.status).json(response.body);

    done();
  });
});

app.get("/game/data/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  if (roomData) {
    res.json(roomData);
  } else {
    res.status(404).json({ error: "Room not Found" });
  }
});

app.get("/game/exists/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const roomData = rooms[roomId];
  if (roomData) {
    res.json(false);
  } else {
    res.json(false);
  }
});

app.patch("/game/data/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  lock.acquire(roomId, async (done) => {
    const { playerId, numberToRemove } = req.body;
    const roomData = rooms[roomId];
    if (roomData) {
      const allNumbers = roomData.players.reduce(
        (arr, player) => [...arr, ...player.numbers],
        []
      );
      const ans = secondSmallest(allNumbers);
      roomData.lastPlayedCard = numberToRemove;
      if (!roomData.history.includes(numberToRemove)) {
        roomData.history.push(numberToRemove);      
      }
      roomData.nextCard = Math.min(...allNumbers);
      if (ans === -1) {
        roomData.won = true;
        res.json(roomData);
      } else if (numberToRemove >= ans) {
        roomData.lost = true;
        res.json(roomData);
      } else {
        const player = roomData.players.find(
          (player) => player.id === playerId
        );
        if (player) {
          player.numbers = player.numbers.filter(
            (num) => num !== numberToRemove
          );
          res.json(roomData);
        }
      }
    }
    done();
  });
});

const secondSmallest = (arr) => {
  if (arr.length < 2) {
    return -1;
  }
  let min = Infinity;
  let secondMin = Infinity;
  arr.forEach((n) => {
    if (n < min) {
      secondMin = min;
      min = n;
    } else if (n < secondMin && n > min) {
      secondMin = n;
    }
  });

  return secondMin;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
