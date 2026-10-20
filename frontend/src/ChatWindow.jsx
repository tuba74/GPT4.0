import React, { useContext, useState, useEffect } from 'react';
import Chat from './Chat.jsx';
import "./ChatWindow.css";
import { MyContext } from './MyContext.jsx';
import { ScaleLoader } from 'react-spinners';

function ChatWindow() {
    const{prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, 
    newChat, setNewChat,}= useContext(MyContext);

    const[loading, setLoading] = useState(false);
    const[isOpen, setIsOpen] = useState(false); // default false


    const getReply = async() =>{
        setLoading(true);
        setNewChat(false);
        
        const options ={
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId: currThreadId,
            })
        }
        try{
            const response = await fetch("https://gpt4-0.onrender.com/api/chat",options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() =>{
        if(prompt && reply){
            setPrevChats(prevChats =>(
                [...prevChats, {
                    role:"user",
                    content: prompt
                }, 
                {
                    role:"assistant",
                    content: reply,
                }
            ]
            ))
        }
        setPrompt("");
    }, [reply])

    const changeDropdown = () =>{
        setIsOpen(!isOpen);
    }
    return ( 
        <div className="chatWindow">
            <div className="navbar">
                <span>GPT4.0<i className="fa-solid fa-angle-down"></i></span>

                <div className="userIconDiv" onClick={changeDropdown}>
                    <span className='userIcon'><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {/* dropdown */}
            {
                isOpen && (
                    <div className="dropdown">
                        <div className="dropdownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
                        <div className="dropdownItem"><i class="fa-solid fa-gear"></i>Settings</div>
                        <div className="dropdownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>
                    </div>
                )
            }

            <Chat></Chat>

            <ScaleLoader color="#b4b4b4" loading={loading} className='loader'/>
            
            <div className="chatInput">
                <div className="userInput">
                    <input type="text" placeholder='Ask anything' 
                    value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'? getReply(): ''}/>

                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>

                <p className='info'>
                    ChatGPT is AI. By using it, you agree to our Terms & Privacy Policy.Chats may be reviewed and used to improve our AI models. Learn more
                </p>
            </div>
        </div>
     );
}

export default ChatWindow;
