import ChatPage from './components/ChatPage';
import { Routes , Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import PlayingGame from './components/PlayingGame';

function App() {
  return (
    <div>


    <Routes>
      <Route path='/' element = {<StartPage />}/>
      <Route path="/chat/:roomId" element = {<ChatPage/>} />  
      <Route path="/game/:roomId" element = {<PlayingGame/>} />  


    </Routes>

    </div>
  
  );
}

export default App;
