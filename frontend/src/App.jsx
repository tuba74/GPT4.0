import './App.css'
import Sidebar from "./Sidebar.jsx";
import Chat from './Chat.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { use, useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const[prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const[newChat, setNewChat]  = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const provider= {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats, 
    newChat, setNewChat,
    allThreads, setAllThreads,
  };
  return (
    <>
    <div className='main'>
      <MyContext.Provider value={provider}>
      <Sidebar/>
      <ChatWindow/>
      </MyContext.Provider>
    </div>
    </>
  )
}

export default App
