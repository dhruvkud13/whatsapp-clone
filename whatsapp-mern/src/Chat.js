import React, {useState} from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios';

function Chat({messages}) {
    const[input,setInput]= useState('');

    const sendMessage =(e) =>{
        e.preventDefault();

        axios.post('http://localhost:9000/messages/new',{
            
                "message": input,
                "name": "ruchi",
                "timestamp": new Date().toUTCString(),
                "received": true,
            
        });

        setInput('');
    }

  return (
    <div className='chat'>
        <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
            <h3> Prats </h3>
            <p>Last seen at...</p>
        </div>
            <div className='chat_headerRight'>
            <IconButton>
                <SearchOutlinedIcon />
            </IconButton>
            {/* <IconButton>
                <AttachFileIcon />
            </IconButton> */}
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </div>
        </div>

        <div className='chat_body'>
            {messages.map((message) =>(
                <p className={`chat_message ${message.received} chat_receiver`}> 
                <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>{message.timestamp}
                </span>
            </p>
            ))}
            <p className='chat_message chat_receiver'> 
                <span className='chat_name'>Me</span>
            Hiii wassup
            <span className='chat_timestamp'>{new 
            Date().toUTCString()}
                </span>
            </p>

            <p className='chat_message'> 
                <span className='chat_name'>Prats</span>
            today valo when
            <span className='chat_timestamp'>{new 
            Date().toUTCString()}
                </span>
            </p>

            <p className='chat_message'> 
                <span className='chat_name'>Prats</span>
            8:30?
            <span className='chat_timestamp'>{new 
            Date().toUTCString()}
                </span>
            </p>
            <p className='chat_message chat_receiver'> 
                <span className='chat_name'>Me</span>
            hello
            <span className='chat_timestamp'>{new 
            Date().toUTCString()}
                </span>
            </p>
        </div>

        <div className='chat_footer'>
            <IconButton>
            <InsertEmoticonIcon />
            </IconButton>
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type='text'/>
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <IconButton>
            <MicIcon />
            </IconButton>
            </div>
    </div>
  )
}

export default Chat