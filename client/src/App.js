import React, {useState} from "react";
import Chats from './ChatsComponent'
function App() {
  const[logged, setLogged] = useState(false)
  const[username, setUsername] = useState('')

  function isLogged(){        //login screen, if logged, then chats are called
    if (logged === true && username!=''){    
      return(
      <div className = "sm:w-3/5 w-full sm:h-3/6 bg-gray-800">
        <p className = 'text-white font-semibold pl-1 float-left text-center w-1/5'>{username}</p>
        <Chats user_name = {username}/>
      </div>
      )
  } else {
    return(
      <form onSubmit = {e => {setLogged(true);}}>
        <h1 className = "text-white font-semibold">Enter your username:</h1>
        <input type='text' onChange = {e => setUsername(e.target.value)} value={username}></input>
        <input type='submit'></input>
      </form>
    )
  }

  }

  return (
    <div className='h-screen w-screen bg-gray-900 overflow-hidden'>
      <a href={window.location}>
      <h1 className = "font-semibold font-mono text-3xl pl-1 text-black bg-yellow-400">Texter</h1>
      </a>
      <div className = 'w-full h-full self-center place-center grid justify-items-center'>
        {isLogged()}
      </div>
    </div>
  );
}


export default App;
