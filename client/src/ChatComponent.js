import React, { useState, useEffect, useRef } from 'react'

function Chat({ other_user_name }) {
    const messagesEndRef = useRef(null)
    const [response, setResponse] = useState('')
    const [messages, addMessage] = useState([{
        name: 'Terka',
        text: 'xs',

    }])

    const renderMessages = () => {
        return (messages.map((message) => {
            return (<div>{renderIndividualMessage(message.name, message.text)}<br /><div ref={messagesEndRef} key = {message.name+message.text}/></div>)
        })
        )
    }


    const renderIndividualMessage = (message_name, text) => {
        if (message_name === other_user_name) {
            return (<div className="float-left">{text}</div>)
        } else {
            return (<div className = "float-right">{text}</div>)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView(false)
    }
    useEffect(() => {
        scrollToBottom()
      });



    return (
        <section className ="h-full">
            <div className="font-semibold text-center">
                Chatting with {other_user_name}
            </div>
            <div className="text-white font-semibold overflow-y-auto text-xl h-5/6 pr-2">
                {renderMessages()}
            </div>
            <form className='float-left h-1/6 w-full' onSubmit = {(e) => {e.preventDefault(); messages.push({name:'unknown', text: response}); setResponse('')}}>
                <input type='text' onChange = {e => setResponse(e.target.value)} value={response} className="w-5/6 h-3/6"></input>
                <input type='submit' className="float-right w-1/6 h-3/6"></input>
            </form>
        </section>
    )
}


export default Chat