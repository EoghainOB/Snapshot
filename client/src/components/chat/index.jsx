import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./index.css";

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://hidden-falls-54168.herokuapp.com"
  : "http://localhost:8000";
const socket = io.connect(URL);

function Chat({ user, setMessageAlert, chatList }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");
  const [user2, setUser2] = useState("");

  useEffect(() => {
    setMessageAlert((prev) => prev - 1);
  }, [setMessageAlert]);

  const { chatRoomId } = useParams();

  useEffect(() => {
    const joinRoom = async () => {
      setRoom(chatRoomId);
      if (user && room !== "") {
        await socket.emit("join_room", room, user);
      }
    };
    joinRoom();
  }, [chatRoomId, room, user, chatList]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (room) {
        const res = await axios.get(`/api/messages/${room}`);
        const readMessages = res.data.map((mes) => {
          if (mes.authorId !== user.googleId) {
            return { ...mes, isRead: true };
          }
          return mes;
        });
        await axios.patch(`/api/messages/${room}`, readMessages);
        setMessageList(res.data);
      }
    };
    fetchMessages();
    setUser2(
      chatList
        .find((chat) => chat.chatRoomId === chatRoomId)
        .users.find((x) => x.googleId !== user.googleId)
    );
  }, [room, user]);

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: user.name,
        authorId: user.googleId,
        message: currentMessage,
        isRead: false,
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
        {user2 && (
          <img
            alt={user2.name}
            className={"chat__user2__img"}
            src={user2.imageUrl}
          />
        )}
        <p className="chat__user2__name">{user2.name}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList?.map((messageContent, i) => {
            return (
              <div
                key={i}
                className={
                  user.name === messageContent.author
                    ? "messages__sent"
                    : "messages__recieved"
                }
                id={user.name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <p className="messages-content">{messageContent.message}</p>
                  <p className="messages-meta" id="time">
                    {messageContent.time}
                  </p>
                  <p className="messages-meta">
                    {messageContent.isRead ? 'Recieved' : 'Sent'}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat__footer">
        <input
          className="chat__footer__input"
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
        <button className="chat__footer__button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
