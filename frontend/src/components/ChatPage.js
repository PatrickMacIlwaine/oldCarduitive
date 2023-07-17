import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChatPage(props){

  const { roomId }= useParams();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  function fetchMessages(roomId) {
    return fetch(`http://localhost:3001/message/${roomId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(e => {
      console.error('There was a problem with your fetch operation: ' + e.message);
    });
  }

  function sendMessages(roomId, message) {
    return fetch(`http://localhost:3001/message/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({text: message}),
    });
  }

  function deleteRoom(roomId) {
    return fetch(`http://localhost:3001/message/${roomId}`, {
      method: 'DELETE',
    });
  }

  useEffect(() =>  {

    console.log(`Room ID : ${roomId}`);
    const intervalID = setInterval(() => {
      fetchMessages(roomId).then(setMessages);
    }, 5000);

    return () => clearInterval(intervalID);
  }, [roomId]);

  const handelSumbit = (event) => {
    event.preventDefault();
    sendMessages(roomId, newMessage)
    .then(() => setNewMessage(''))
    .then(() => fetchMessages(roomId).then(setMessages));
  };

  


return (
  <div> 
    <h1>Hello World</h1>
    <h1> Chat Room : {roomId}</h1>
    <h2> Messages : </h2>
    {Array.isArray(messages) && messages.map((message, index) => (
  <p key = {index}>{message.text}</p>
))}
    

    <form onSubmit = {handelSumbit}>
      <input
      type = "text"
      value = {newMessage}
      onChange = {event => setNewMessage(event.target.value)}     
      />
      <button type="submit">Send</button>

    </form>


    <button onClick={() => deleteRoom(roomId)}>Delete this chat room</button>

    
  </div>

);
}
export default ChatPage;