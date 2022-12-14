import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Chat } from '../components/Chat'
import { InitializeChat } from '../components/InitializeChat'
import { useGlobalState } from '../GlobalStateContext'



interface CreateUser {
  command: string;
  username: string;
}
const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const { state, setState } = useGlobalState();

  
  
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/ws/chat');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    onError: (err) => console.error("web socket error ", err)
  });

  useEffect(() => {
    if(lastMessage !== null && JSON.parse(lastMessage.data)?.message !== undefined){
      setMessageHistory((prev) => prev.concat(lastMessage));
      const parsed = JSON.parse(lastMessage.data)?.message
      if(JSON.parse(parsed).event === "last_messages"){
        
        setState((prev) => ({...prev, lastMessages: JSON.parse(parsed).messages.reverse()}))
      }
      else if(JSON.parse(parsed).event === "message_created"){
        setState((prev) => ({...prev, lastMessages: [...prev.lastMessages, JSON.parse(parsed).data]}))
      }
    }
  }, [lastMessage, setMessageHistory]);

  const initChatUser = (username: string | undefined) => {
    setUsername(username!)
    setLoggedIn(true)
    sendMessage(JSON.stringify({ command: 'init_chat', username: username }));
  }

  const fetchMessages = () => {
    sendMessage(JSON.stringify({ command: 'get_messages' }));
  }

  const newChatMessage =(message) => {
      sendMessage(JSON.stringify({ command: 'create_message', user: message.user, content: message.content})); 
    }

  const chatCallback = (username) => {
      initChatUser(username)
      fetchMessages()
  }
  

  return (
    
<div>
      {loggedIn ? 
      <Chat username={username} socketFunctions={chatCallback} createMessage={newChatMessage}/> : 
      <InitializeChat initUser={initChatUser} />}  
    </div>
    

      
  )
}

export default Home
