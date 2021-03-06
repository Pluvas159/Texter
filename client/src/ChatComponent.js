import React, { useState, useEffect, useRef } from 'react'


function Chat({ other_user_name, user_name, socket, message, changeMessage, changeReceived, receivedMessages}) {
    const messagesEndRef = useRef(null)
    const [response, setResponse] = useState('')
    const [messages, addMessages] = useState([{}])
    const conn = require("./Connection.js")
    const [receiving, setReceiving] = useState(false) 


    const renderMessages = () => {
        try{
        return (messages.map((message) => {
            return (<div>{renderIndividualMessage(message.sender, message.message)}<div ref={messagesEndRef} key = {message.sender+message.message}/></div>)
        })
        )} catch {
            return(<div><div ref={messagesEndRef}/></div>)
        }
    }

    const renderIndividualMessage = (message_name, text) => {
        if (message_name === other_user_name) {
            return (<div className="text-left w-full">{text}</div>)
        } else {
            return (<div className = "text-right w-full">{text}</div>)
        }
    }

    const scrollToBottom = () => {   //function for scrolling to bottom in the chat on every render
        messagesEndRef.current.scrollIntoView(false)
    }

    useEffect(() => { 
        /*if (!receiving){
            socket.on('recv-msg', message =>{
                addMessages([...messages, {sender:other_user_name, recipient: user_name, message: message}])
                console.log(message)
             })
             setReceiving(true)
        } */
        if (message!==''){
            addMessages([...messages, {sender:other_user_name, recipient:user_name, message : message}])  
            changeMessage('')    
        }
        
        
        //this function happens only on component creation
        if(!receivedMessages){
            conn.getMessage(user_name, other_user_name, pushMessages, window.location.hostname)
        }
        changeReceived(true)
        //const interval = setInterval(() => conn.getMessage(user_name, other_user_name, pushMessages,window.location.hostname), 2000);
        try{
            scrollToBottom()}
        catch {}
        return () => {          //return happens on component deletion
            //clearInterval(interval);
        };
      });
    



    const pushMessages = (mesg) => {
        try{
        if (mesg[mesg.length-1].message!=messages[messages.length-1].message){
            addMessages(mesg)}
        } catch {
            addMessages(mesg)
        }
    }
    return (
        <section className ="h-full">
            <div className="font-semibold text-center text-white">
                Chatting with {other_user_name}
            </div>
            <div className="text-white font-semibold overflow-y-auto text-xl h-5/6 pl-2 pr-2">
                {renderMessages()}

            </div>
            <form className='float-left h-1/6 w-full' onSubmit = {(e) => {e.preventDefault(); {conn.postMessage(user_name, other_user_name, response, window.location.hostname); socket.emit('send-msg', response, other_user_name);
                if(other_user_name!='n'){addMessages([...messages, {sender:user_name, recipient: other_user_name, message: response}])};setResponse('')}}}>

                <input type='text' onChange = {e => setResponse(e.target.value)} value={response} className="w-5/6 h-3/6"></input>
                <input type='submit' className="float-right w-1/6 h-3/6"></input>
            </form>


        </section>
    )
}


export default Chat