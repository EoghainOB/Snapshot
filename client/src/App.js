import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";
import Header from "./components/header";
import Profile from "./components/profile";
import PostForm from "./components/postForm";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";
import MemberList from "./components/memberList";
import PageNotFound from "./components/pageNotFound";
import Chat from "./components/chat";
import ChatList from "./components/chatList";

function App() {
  const [position, setPosition] = useState(null);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [sort, setSort] = useState("Top Rank");
  const [messageAlert, setMessageAlert] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_API,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchNewMessages = async () => {
      if (user) {
        const res = await axios.get(`/api/chats/${user.googleId}`);
        const filteredMessages = await res.data.map((chat) =>
          chat.messages.filter(
            (mes) => mes.authorId !== user.googleId && !mes.isRead
          )
        );
        const eliminate = filteredMessages.filter((x) => x.length > 0);
        setMessageAlert(eliminate.length);
      }
    };
    fetchNewMessages();
    getLocation();
    getData();
  }, [user]);

  const filteredAndSorted = () => {
    const filtered = searchTerm
      ? posts.filter((p) =>
          p.address?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : posts;

    switch (sort) {
      case "Lowest Rank":
        return filtered.sort((a, b) => a.rank - b.rank);
      case "Most Viewed":
        return filtered.sort((a, b) => b.views - a.views);
      case "Lowest Views":
        return filtered.sort((a, b) => a.views - b.views);
      case "Newest":
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Oldest":
        return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return filtered.sort((a, b) => b.rank - a.rank);
    }
  };

  return (
    <div className="App">
      <Header setUser={setUser} messageAlert={messageAlert} user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar setSearchTerm={setSearchTerm} />
              {isLoaded && posts.length > 0 && (
                <Map
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  posts={filteredAndSorted()}
                  position={position}
                />
              )}
              <Dashboard
                user={user}
                sort={sort}
                setSort={setSort}
                posts={filteredAndSorted()}
              />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={<Profile setPosts={setPosts} posts={posts} user={user} />}
        />
        {user && (
          <Route
            path={`/post/`}
            element={
              <PostForm setPosts={setPosts} user={user} position={position} />
            }
          />
        )}
        <Route
          path="/posts/:postId"
          element={
            <Post setSearchTerm={setSearchTerm} posts={posts} user={user} />
          }
        />
        <Route
          path="/chats/"
          element={<ChatList setMessageAlert={setMessageAlert} user={user} />}
        />
        <Route
          path="/chats/:chatRoomId"
          element={<Chat setMessageAlert={setMessageAlert} user={user} />}
        />
        <Route
          path="/users/"
          element={<MemberList posts={posts} user={user} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
