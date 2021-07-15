import React, { useEffect, useState } from 'react'
import Chat from './ChatComponent'
import { io } from 'socket.io-client'

const Chats = (props) => {
    const [nameOfChat, setNameOfChat] = useState('n')
    const [chat, setChat] = useState('')
    const [chats, addChat] = useState([])
    const conn = require("./Connection.js")
    const [socket, changeSocket] = useState(io('http://localhost:5001'))
    const [message, changeMessage] = useState('')
    const [received_messages, changeReceived_messages] = useState(false)
    const [lastChat, setLastChat] = useState('')
    

    const pushChats = (chts) =>{
        if (chts!=chats){
        addChat(chts)
        }
    }


    function renderChats() {    //function for rendering each chat on the left "each person" using map
        if (chats!=[]){
        return chats.map((chat) => {
            return (
                <button className="float-left w-full font-semibold text-yellow-300" onClick={(e) => {setNameOfChat(e.target.innerHTML); socket.emit('leave-room', lastChat); socket.emit('join-room',  chat); changeReceived_messages(false); setLastChat(chat)}}>
                   {chat.filter(x => x!= props.user_name)}
                </button>
            )
        })}
    }


    useEffect(() => {               //this function happens only on component creation
        socket.on('recv-msg', message =>{
            changeMessage(message)
        })
        conn.getChatters(props.user_name, pushChats, window.location.hostname)   //getting all the chats right on the creation
        //const interval = setInterval(() => conn.getChatters(props.user_name, pushChats, window.location.hostname), 10000);  //updating chats list every 10s
        return () => {  //return happens on component deletion
            //clearInterval(interval);
        };
      }, []);

    return (
        <div className="h-screen">
            <div className="w-4/5 h-3/5 bg-gray-800 float-right">
                {<Chat other_user_name={nameOfChat} user_name = {props.user_name} socket = {socket} message  = {message} changeMessage = {changeMessage} changeReceived = {changeReceived_messages} receivedMessages = {received_messages}/>}
            </div>
            <div className="w-1/5 h-3/5  bg-gray-700">
                <div className='h-full'>
                    {renderChats()}
                </div>
                <form onSubmit={(e)=>{e.preventDefault();conn.postChat(props.user_name, chat, window.location.hostname);setChat('');
            setTimeout(()=> conn.getChatters(props.user_name, pushChats, window.location.hostname))}}>
                    <h1 className = "text-white font-semibold">Start chatting with:</h1>
                    <input type='text' onChange={e => setChat(e.target.value)} value ={chat} className= "lg:w-3/5 w-full"></input>
                    <input type='submit' className = "lg:w-2/5 w-full"></input>
                </form>
            </div>

        </div>
    )

}


export default Chats