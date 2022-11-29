import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {useParams} from 'react-router-dom';
import io from 'socket.io-client'
import axios from "axios";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? 'https://hidden-falls-54168.herokuapp.com' : 'http://localhost:8000';
const socket = io.connect(URL);

function Chat({ user }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");

  const {chatRoomId} = useParams(); 

  useEffect(() => {
    const joinRoom = async () => {
      setRoom(chatRoomId)
      if (user && room !== "") {
        await socket.emit("join_room", room);
      }
    };
    joinRoom()
  }, [room, user, chatRoomId])

    useEffect(() => {
      const fetchMessages = async () => {
        if (room) {
          const res = await axios.get(`/api/messages/${room}`);
          setMessageList(res.data);
        }
      }
      fetchMessages()
  }, [room]);
  
    useEffect(() => {
      socket.on("receive_message", async (data) => {
          const res = await axios.get(`/api/messages/${room}`);
          setMessageList(res.data);
      });
  }, [room]); 

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: user.name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
};

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Direct Messages</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={user.name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
