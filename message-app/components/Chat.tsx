import { Button, createStyles, makeStyles, Paper, TextField, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../GlobalStateContext";
import SendIcon from '@material-ui/icons/Send';
import { Message } from "./Message";
import { useStylesChat } from "../styles/styles";


interface ChatProps {
    socketFunctions: (username) => void;
    createMessage: (message) => void;
    username: string;
}



export const Chat: React.FC<ChatProps> = (props: ChatProps) => {

    let messagesEnd = null

    const { state, setState } = useGlobalState();

    const [currMessage, setCurrMessage] = useState()
    useEffect(() => {
        props.socketFunctions(state.username)
        scrollToBottom()
    }, [])

    useEffect(() => {
      scrollToBottom()
    }, [state.lastMessages])

    const currentUser = props.username;
    const renderMessages = (messages) => {
        return messages.map((message) => 
        <Message 
        position={message.user === props.username ? "right" : "left"}
        displayName={ message.user }
        message={ message.content }
        />
        )
      }

    const sendMessageHandler = (e) => {
        const messageObject = {
          user: currentUser,
          content: currMessage
        };
        props.createMessage(messageObject);
        setCurrMessage("")
        e.preventDefault()
      }

    const scrollToBottom = () => {
        const chat = messagesEnd;
        const scrollHeight = chat.scrollHeight;
        const height = chat.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }

    const styles = useStylesChat()
    return (
      
      <div className={styles.container}>
        <div>
        <h1>Hello, {currentUser}! Start Chatting. </h1>
        </div>
        
        <Paper className={styles.paper}>
        <div className={styles.messagesBody} ref={(el) => { messagesEnd = el; }}>
        
          <ul style={{listStyle: 'none'}} >
           { 
              state.lastMessages && 
              renderMessages(state.lastMessages) 
           }
          </ul>
        </div>
        <div>
          <form className={styles.wrapForm} onSubmit={(e) => sendMessageHandler(e)} className='form'>
            <TextField
              multiline
              type='text'
              onChange={(event) =>  {
                setCurrMessage(event.target.value)
              }}
              value={currMessage}
              placeholder='Message'
              required />

          <Button variant="contained" color="primary" className='submit' type='submit'>
                <SendIcon />
            </Button>

          </form>
        </div>
        </Paper>
        
      </div>
    )

}
