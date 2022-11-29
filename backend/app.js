const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./utils/mongoose");
const { Users, Posts, Chats } = require("./utils/schema");
const cloudinary = require("./utils/cloudinary");
const path = require("path");
const fileUpload = require("express-fileupload");
const streamifier = require("streamifier");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://hidden-falls-54168.herokuapp.com",
    ],
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();

const uploadFile = (file, id) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: file.mimetype.includes("video") ? "video" : "",
        folder: "SnapShot",
        public_id: id,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          console.log(error);
          reject(error);
        }
      }
    );
    streamifier.createReadStream(file.data).pipe(stream);
  });
};

const getImageLinks = async (file, uniqueId) => {
  const imageLink = [];
  for (let i = 0; i < file.length; i++) {
    const uploaded = await uploadFile(file[i]);
    imageLink.push(uploaded.secure_url);
  }
  return imageLink;
};

connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../client/build")));

io.on("connection", (socket) => {+
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", async (chatRoomId, user) => {
    try {
      const chatRoom = await Chats.findOne({ chatRoomId });
      if (!chatRoom && user) {
        const bigId = (+chatRoomId - +user.googleId).toString().slice(0, 6)
        const id = new RegExp(bigId)
        console.log("USERID", id)
        const user2 = await Users.findOne({ googleId: { $regex: id }  });
        console.log("USER2", user2)
        await Chats.create({ chatRoomId, messages: [], users: [user, user2] });
      }
      socket.join(chatRoomId);
      console.log(`User with ID: ${socket.id} joined room: ${chatRoomId}`);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("send_message", async (data) => {
    try {
      const chatRoom = await Chats.findOne({ chatRoomId: data.room });
      const existingMessages = chatRoom.messages;
      await Chats.findOneAndUpdate(
        { chatRoomId: data.room },
        { messages: [...existingMessages, data] }
      );
      return socket.to(data.room).emit("receive_message", data);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/api/messages/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Chats.findOne({ chatRoomId: roomId });
    res.status(200).json(room?.messages ? room.messages : []);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { googleId } = req.body;
    const user = await Users.find({ googleId });
    if (user.length) {
      console.log("user found");
      return res.json(user);
    }
    await Users.create(req.body);
    console.log("user created");
    const newUser = await Users.find({ googleId });
    return res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ googleId: id });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Posts.findOne(req.params);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    let { file } = req.files;
    if (!Array.isArray(file)) {
      file = [file];
    }
    const { title, description, tags, author, address } = req.body;
    const location = JSON.parse(req.body.location);
    const uniqueId = uuidv4();
    const imageLink = await getImageLinks(file, uniqueId);
    const newPost = {
      id: uniqueId,
      title,
      description,
      tags: tags.split(","),
      author,
      imageLink,
      location,
      address,
      views: 0,
      rank: 0,
      date: new Date(),
      comments: [],
    };
    Posts.create(newPost);
    res.status(200).send("successful");
  } catch (err) {
    console.log(err);
  }
});

app.patch("/api/posts/:id", async (req, res) => {
  try {
    await Posts.findOneAndUpdate(req.params, req.body);
    res.json("Updated");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    await Posts.findOneAndDelete(req.params);
    res.json("Deleted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/chats/:userId", async (req, res) => {
  try {
    const allChats = await Chats.find();
    const chatList = allChats.filter(chat => chat.users[0].userId === req.params.userId || chat.users[1].userId === req.params.userId)
    res.status(200).json(chatList);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
