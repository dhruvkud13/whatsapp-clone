import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material';
function SidebarChat({name,message}) {
  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2> {name} </h2>
            <p>{message}</p>
            </div>
    </div>
  )
}

export default SidebarChat