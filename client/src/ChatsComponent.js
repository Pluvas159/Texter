import React, { useState } from 'react'
import Chat from './ChatComponent'

const Chats = (props) => {
    const [nameOfChat, setNameOfChat] = useState('')
    const [chat, setChat] = useState('')
    const [chats, addChat] = useState(['Terka','Jano'])

    function renderChats() {
        return chats.map((chat) => {
            return (
                <button className="float-left w-full font-semibold" onClick={(e) => setNameOfChat(e.target.innerHTML)}>
                   {chat}
                </button>
            )
        })
    }
    return (
        <div className="h-screen">
            <div className="w-4/5 h-3/5 bg-gray-600 float-right">
                <Chat other_user_name={nameOfChat} />
            </div>
            <div className="w-1/5 h-3/5  bg-gray-700 ">
                {renderChats()}
            </div>
        </div>
    )

}


export default Chats