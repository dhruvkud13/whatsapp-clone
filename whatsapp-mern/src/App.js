import React, {useEffect, useState} from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const[messages,setMessages]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('4b54627c5e3e55416b05', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    console.log(channel);
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
      setMessages([...messages,data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]); 

  console.log(messages);

  return (
    <div className="app">
     <div className='app_body'>
     <Sidebar />

    <Chat messages={messages}/>
       </div> 

    </div>
  );
}

export default App;
