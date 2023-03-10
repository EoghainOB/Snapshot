const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    googleId: String,
    imageUrl: String,
    email: String,
    name: String,
    givenName: String,
    familyName: String,
});

const postSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    tags: Array,
    author: String,
    googleId: String,
    imageLink: Array,
    location: Object,
    address: String,
    date: Date,
    views: Number,
    rank: Number,
    comments: Array,
    upvotes: Array,
    downvotes: Array,
})

const chatSchema = new mongoose.Schema({
    chatRoomId: String,
    authorId: String,
    messages: Array,
    users: Array,
    isRead: Boolean,
})


const Users = mongoose.model('User', userSchema);
const Posts = mongoose.model('Post', postSchema);
const Chats = mongoose.model('Chats', chatSchema);

module.exports = {Users, Posts, Chats};