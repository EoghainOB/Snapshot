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
    imageLink: Array,
    location: Object,
    date: Date,
    views: Number,
    rank: Number,
    comments: Array,
})

const Users = mongoose.model('User', userSchema);
const Posts = mongoose.model('Post', postSchema);

module.exports = {Users, Posts};