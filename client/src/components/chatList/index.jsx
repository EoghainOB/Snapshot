import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatList = ({ user, updateMessage }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const res = await axios.get(`/api/chats/${user.googleId}`);
      setChatList(res.data);
    };
    fetchChatList();
  }, [user, updateMessage]);

  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chatList.map((chat, i) => 
        <li key={i}>
            <Link to={`/chats/${chat.chatRoomId}`}>
            <img alt={i} src={chat.users.find(x => x.name !== user.name).imageUrl}/>
            <p>{chat.users.find(x => x.name !== user.name).name}</p>
            <span>{chat.messages.filter(mes => mes.authorId !== user.googleId && !mes.isRead).length}</span>
            </Link>
        </li> 
        )}
      </ul>
    </div>
  );
};

export default ChatList;
