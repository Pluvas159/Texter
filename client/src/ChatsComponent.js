import React, { useEffect, useState } from 'react'
import Chat from './ChatComponent'

const Chats = (props) => {
    const [nameOfChat, setNameOfChat] = useState('n')
    const [chat, setChat] = useState('')
    const [chats, addChat] = useState([])
    const conn = require("./Connection.js")
    

    const pushChats = (chts) =>{
        if (chts!=chats){
        addChat(chts)
        }
    }


    function renderChats() {    //function for rendering each chat on the left "each person" using map
        if (chats!=[]){
        return chats.map((chat) => {
            return (
                <button className="float-left w-full font-semibold text-yellow-300" onClick={(e) => setNameOfChat(e.target.innerHTML)}>
                   {chat.filter(x => x!= props.user_name)}
                </button>
            )
        })}
    }

    useEffect(() => {               //this function happens only on component creation
        conn.getChatters(props.user_name, pushChats, window.location.href)   //getting all the chats right on the creationg
        const interval = setInterval(() => conn.getChatters(props.user_name, pushChats, window.location.hostname), 10000);  //updating chats list every 10s
        return () => {  //return happens on component deletion
            clearInterval(interval);
        };
      }, []);

    return (
        <div className="h-screen">
            <div className="w-4/5 h-3/5 bg-gray-800 float-right">
                {<Chat other_user_name={nameOfChat} user_name = {props.user_name}/>}
            </div>
            <div className="w-1/5 h-3/5  bg-gray-700">
                <div className='h-full'>
                    {renderChats()}
                </div>
                <form onSubmit={(e)=>{e.preventDefault();conn.postChat(props.user_name, chat, window.location.hostname);setChat('');
            setTimeout(()=> conn.getChatters(props.user_name, pushChats, window.location.href))}}>
                    <h1 className = "text-white font-semibold">Start chatting with:</h1>
                    <input type='text' onChange={e => setChat(e.target.value)} value ={chat} className= "lg:w-3/5 w-full"></input>
                    <input type='submit' className = "lg:w-2/5 w-full"></input>
                </form>
            </div>

        </div>
    )

}


export default Chats