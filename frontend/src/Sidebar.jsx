import React from 'react';
import "./Sidebar.css";
import { useContext ,useEffect} from 'react';
import { MyContext } from './MyContext';
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId,setPrompt, setReply, setPrevChats, setNewChat, setCurrThreadId} = useContext(MyContext);

    const getAllThreads = async() =>{
        try{
            const response = await fetch("https://gpt4-0.onrender.com/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}))
            setAllThreads(filteredData);
            // console.log(filteredData);
        }catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        getAllThreads()
    }, [currThreadId])

    const getNewChat = () =>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setPrevChats([]);
        setCurrThreadId(uuidv1());
    }
    const getChatHistory = async(threadId) =>{
        setCurrThreadId(threadId);
        try{
            
            const response = await fetch(`https://gpt4-0.onrender.com/api/thread/${threadId}`);

            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
            // console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    const deleteThread = async(threadId) =>{
        const options ={
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            // body:JSON.stringify({
            //     message:prompt,
            //     threadId: currThreadId,
            // })
        }
        try{
            
            const response = await fetch(`https://gpt4-0.onrender.comapi/thread/${threadId}`, {method: "DELETE"});

            const res = await response.json();
            console.log(res);

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId){
                getNewChat();
            }
        }catch(err){
            console.log(err);
        }
    }
    return ( 
        <section className='sidebar'>
            <button onClick={getNewChat}>
                <img src='src/assets/chatgpt_logo_dark.jpg' alt="gpt4.0 logo" />
                <i className="fa-regular fa-pen-to-square"></i>
            </button>

            <ul className='history'>
                {
                    allThreads.map((thread, idx) =>(
                        <li key={idx}
                        onClick={(e) => getChatHistory(thread.threadId)}
                        className={thread.threadId === currThreadId? "highlighted": " "}>
                        {thread.title}
                        <i className="fa-solid fa-trash"
                        onClick={(e) =>{
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}></i>
                        </li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>Created by gpt &hearts;</p>
            </div>
        </section>
     );
}

export default Sidebar;
