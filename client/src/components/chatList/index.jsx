import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './index.css'

const ChatList = ({ user, setMessageAlert }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const res = await axios.get(`/api/chats/${user.googleId}`);
      const filteredMessages = await res.data.map(chat => chat.messages.filter(mes => mes.authorId !== user.googleId && !mes.isRead))
      const eliminate = filteredMessages.filter(x => x.length > 0)
      setMessageAlert(eliminate.length);
      setChatList(res.data);
    };
    fetchChatList();
  }, [user, setChatList]);

  return (
    <div className='chat-list'><h2>Chats</h2>
      <ul className='chat-list__list'>
        {chatList.map((chat, i) => 
        <>
        <li className='chat-list__list__item-container' key={i}>
            <Link to={`/chats/${chat.chatRoomId}`}>
            <img className='chat-list__image' alt={i} src={chat.users.find(x => x.name !== user.name).imageUrl}/>
            </Link>
            <Link to={`/chats/${chat.chatRoomId}`}>
            <span className='chat-list__username'>{chat.users.find(x => x.name !== user.name).name}</span>
            </Link>
            <span className={chat.messages.filter(mes => mes.authorId !== user.googleId && !mes.isRead).length > 0 ? 'chat__header__unread' : 'chat__header__read'}>{(chat.messages.filter(mes => mes.authorId !== user.googleId && !mes.isRead)).length}</span>
        </li> 
        <hr/>
        </>
        )}
      </ul>
    </div>
  );
};

export default ChatList;