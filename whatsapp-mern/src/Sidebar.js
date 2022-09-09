import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
function sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src='https://cdn.statusqueen.com/dpimages/thumbnail/dp_image191-1193.jpg' />
            <div className='sidebar_headerRight'>
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                <ChatIcon />
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
                </div> 
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlinedIcon />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat name="Prats" message="hello"/>
                <SidebarChat name="Ruchi" message="hi"/>
                <SidebarChat name="Ishaan" message="didnt ask"/>
                </div>
        </div>
    
  )
}

export default sidebar